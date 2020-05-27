import os
from pathlib import Path
from os.path import dirname, abspath
import re
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import io
import base64

def data_cleaning(df):
    df=clean_data(df)
    df=normalise_units(df)
    return df

def correlation_maps(df):
    corr = df.corr()
    # Generate a mask for the upper triangle
    mask = np.triu(np.ones_like(corr, dtype=np.bool))
    # Set up the matplotlib figure
    f, ax = plt.subplots(figsize=(11, 9))
    # Generate a custom diverging colormap
    plt.title('Correlation Map between all elements')
    cmap = sns.diverging_palette(220, 10, as_cmap=True)
    # Draw the heatmap with the mask and correct aspect ratio
    image=sns.heatmap(corr, mask=mask, cmap=cmap, vmax=.3, center=0,
                square=True, linewidths=.5, cbar_kws={"shrink": .5}).get_figure()
    return image, "plot"

def clean_data(df):
    df.drop(columns = ["SP_Hole_ID","To_Hole_Position", "Match"], inplace = True)
    df.set_index("From_Hole_Position", inplace = True)
    df.rename(columns = {'From_Hole_Position':'Depth'})
    df.dropna(how = 'any', axis = 'rows', inplace = True)
    df[df<0] = 0
    return df

def normalise_units(df):
    re_1 = re.compile("_pct|_ppm")
    re_2 = re.compile("pct")
    for column in df.columns:
        if bool(re_2.search(column)):
            df[column] = df[column]*10000
        df.rename(columns = {column: re_1.sub("", column) }, inplace = True)
    return df

def address_linear_regression(df):
    return '/api/Analytic/LinearRegression', 'url'
def address_kde_plot(df):
    return '/api/Analytic/KdePlot', 'url'

def linear_regression(X,Y,df):
    f, ax = plt.subplots(figsize=(11, 9))
    sns.lmplot(x=X, y=Y, data=df)
    plt.title('Linear regression of elements '+X+' and '+Y+' (ppm data)')
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    my_base64_jpgData = base64.b64encode(bytes_image.read())
    return my_base64_jpgData

def kde_plot(X,Y,Z,df):
    data = df
    elements = [X,Y,Z]
    fig = plt.figure(figsize=(5, 5))
    np.random.seed(0)
    label_patches = []

    cmaps = ['Reds', 'Greens', 'Blues']
    for e in elements:
        x = data.index
        y = data[e]
        label = 'Element: {}'.format(e)
        ax = sns.kdeplot(x, y,  shade=False)
        label_patch = mpatches.Patch(
            color=sns.color_palette(cmaps[elements.index(e)])[2],
            label=label)
        label_patches.append(label_patch)

    ax.set(xlabel ='Depth', ylabel = 'Concentration (PPM)')
    plt.title('Kernel Density Estimation')
    plt.legend(handles=label_patches, loc='upper left')

    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    my_base64_jpgData = base64.b64encode(bytes_image.read())
    return my_base64_jpgData