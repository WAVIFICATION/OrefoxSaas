import pandas as pd
import numpy as np
import re
from flask import Flask, request, session, send_file
from flask_restful import Resource
import io
import seaborn as sns
import matplotlib.pyplot as plt
from pathlib import Path
from os.path import dirname, abspath

'''
piece of code to fetch a filename and access it
filename = 'xxx'
'''

class preprocessing(Resource):

    def preprocess_data(df):
        '''
            Note: Needs to be run first before running any other preprocessing

                1. Drops unnecessary columns
                2. Sets index to the depth of the hole position, which can be used later for analysis
                3. drops any negative data as negative concentration just means our values are below standard

            args:
            -----
                *Takes the dataframe as the input

            returns:
            --------
                Processed dataframe
            '''

        df.drop(columns=["SP_Hole_ID", "To_Hole_Position", "Match"], inplace=True)
        df.set_index("From_Hole_Position", inplace=True)
        df.rename(columns={'From_Hole_Position': 'Depth'})
        df.dropna(how='any', axis='rows', inplace=True)
        df[df < 0] = 0

        '''
                    To convert concentrations which are in Percent(PCT) to Parts Per Million(PPM)

        '''

        re_1 = re.compile("_pct|_ppm")
        re_2 = re.compile("pct")

        for column in df.columns:
            if bool(re_2.search(column)):
                df[column] = df[column] * 10000
            df.rename(columns={column: re_1.sub("", column)}, inplace=True)

        return df

    def matrix(self, filepath):
        '''
        :param: dataframe
        :return: Output a matrix with correlations among all elements
        '''
        data = pd.read_csv(filepath)
        corr_matrix = data.corr()  # Data in matrix form

        return corr_matrix  # This matrix needs to be stored in EC2 for live plotting





class plots(Resource):

    def correlation_matrix(matrix, elements):
        '''

        :param matrix: Correlation matrix from EC2
        :param elements: list of elements fetched by the HTML form
        :return: a bytesIO image file which can be displayed on the webbrowser using source of this image file
        '''
        sns.set(rc={'figure.figsize': (15, 15)})
        # elements = list(elements)

        f, ax = plt.subplots(figsize=(11, 9))
        cmap = sns.diverging_palette(220, 10, as_cmap=True)

        sns.heatmap(matrix.loc[elements, elements])

        bytes_image = io.BytesIO()
        plt.savefig(bytes_image, format='png')
        bytes_image.seek(0)

        return send_file(bytes_image,
               attachment_filename='correlation_plot.png',
               mimetype='image/png')

    def dist_plot(self, element, filepath):
        '''

        :param element: Choice of element
        :param filepath: filepath for the preprocessed file as it exists on the EC2
        :return: a BytesIO Image file which can be displaye don the HTML

        '''

        data = pd.read_csv(filepath)

        ax = sns.distplot(data[element], hist=True,
                              color='darkblue',
                              hist_kws={'edgecolor': 'black'},
                              kde_kws={'linewidth': 4})
        ax.set(xlabel=element, ylabel='Probability Density')
        plt.plot()

        bytes_image = io.BytesIO()
        plt.savefig(bytes_image, format='png')
        bytes_image.seek(0)

        return send_file(bytes_image,
                             attachment_filename='density_plot.png',
                             mimetype='image/png')

    '''
    This file needs to be sent back to EC2 for further use.
    '''

