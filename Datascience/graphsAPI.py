# import libraries

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import re
import io

from flask import Flask, request, session, send_file
from flask_restful import Resource

from pathlib import Path
from os.path import dirname, abspath

'''
filename = 'xxx' 
Connect with database to fetch the preprocessed file
'''


class Correlations(Resource):

    def correlation_matrix(self, filename):
        '''
        :param: Takes a list of elements in list[] format (Can be passed as json first if need be)
        :return: Output a matrix with correlations among different elements
        '''
        data = pd.read_csv(filename)
        corr_matrix = data.corr()  # Data in matrix form

        return corr_matrix # This matrix needs to be stored in EC2 for live plotting

class plots(Resource):

    def correlation_matrix(self, matrix, elements):
        '''

        :param matrix: Correlation matrix from EC2
        :param elements: list of elements fetched by the HTML form
        :return: a bytesIO image file which can be displayed on the webbrowser using source of this image file
        '''

        sns.set(rc={'figure.figsize': (15, 15)})
        elements = list(elements)


        f, ax = plt.subplots(figsize=(11, 9))
        cmap = sns.diverging_palette(220, 10, as_cmap=True)
        mask = np.zeros_like(matrix, dtype=np.bool)
        mask[np.triu_indices_from(mask)] = True

        sns.heatmap(matrix, mask=mask, cmap=cmap, vmax=.3, center=0,
                    square=True, linewidths=.5, cbar_kws={"shrink": .5})

        bytes_image = io.BytesIO()
        plt.savefig(bytes_image, format='png')
        bytes_image.seek(0)

        return send_file(bytes_image,
                     attachment_filename='correlation_plot.png',
                     mimetype='image/png')

    def dist_plot(self, element, filename):

        '''

        :param element: Choice of element
        :param filename: filename for the preprocessed file as it exists on the EC2
        :return: a BytesIO Image file which can be displaye don the HTML

        '''

        data = pd.read_csv(filename)

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


