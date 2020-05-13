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