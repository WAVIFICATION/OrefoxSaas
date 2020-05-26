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
    cmap = sns.diverging_palette(220, 10, as_cmap=True)
    # Draw the heatmap with the mask and correct aspect ratio
    image=sns.heatmap(corr, mask=mask, cmap=cmap, vmax=.3, center=0,
                square=True, linewidths=.5, cbar_kws={"shrink": .5}).get_figure()
    return image, "heatmap"



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

def linear_regression(X,Y,df):
    f, ax = plt.subplots(figsize=(11, 9))
    sns.lmplot(x=X, y=Y, data=df)
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    my_base64_jpgData = base64.b64encode(bytes_image.read())
    return my_base64_jpgData

def dist_plot(df):
    '''

    :param element: Choice of element
    :param filepath: filepath for the preprocessed file as it exists on the EC2
    :return: a BytesIO Image file which can be displaye don the HTML

    '''
    data = df
    ax = sns.distplot(data['Cu'], hist=True,
                            color='darkblue',
                            hist_kws={'edgecolor': 'black'},
                            kde_kws={'linewidth': 4})
    ax.set(xlabel=element, ylabel='Probability Density of Cu')
    

    return ax.get_figure(), "dist_plot"


def pair_plot(df):
    '''

    :param filepth: filepath for the preprocessed file as it exists on the EC2
    :param elements: elements selected by the user
    :return: Pair plot image in a bytesIO format to be displayed on html
    '''

    data = df
    # elements = list(elements)
    g = sns.PairGrid(data[['Depth', 'Cu', 'Mg']])
    g = g.map_upper(sns.scatterplot)
    g = g.map_lower(sns.kdeplot, colors="C0")
    g = g.map_diag(sns.kdeplot, lw=2)
    plt.plot()
        
    return g.get_figure(), "pair_plot"

def kde_plot(df):

    data = df
    elements = ['Cu', 'Mg', 'Ca', 'Fe']
    fig = plt.figure()
    np.random.seed(0)
    label_patches = []

    cmaps = ['Reds', 'Blues', 'Greens']
    for e in elements:
        x = data['Depth']
        y = data[e]
        label = 'Element: {}'.format(e)
        ax = sns.kdeplot(x, y, cmap=cmaps[elements.index(e)], shade=False)
        label_patch = mpatches.Patch(
            color=sns.color_palette(cmaps[elements.index(e)])[2],
            label=label)
        label_patches.append(label_patch)
    ax.set(xlabel ='Depth', ylabel = 'Concentration (PPM)')
    fig.title('Kernel Density Estimation')
    plt.legend(handles=label_patches, loc='upper left')

    return ax.get_image(), "kde_plot"