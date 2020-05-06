import pandas as pd
import numpy as np
import re
from flask import Flask, request, session, send_file
from flask_restful import Resource

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



    '''
    This file needs to be sent back to EC2 for further use.
    '''