import pandas as pd
import numpy as np
from preprocess_data import preprocessing
import re

import random

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

'''
link dataframe here
'''
dataframe = # raw data file from database

data = preprocessing.preprocess_data(df= dataframe, model= True)

## Gather the correlation matrix to find top 10 columns to consider for model training
'''
Correlation matrix goes here
'''
matrix = 'Get data from EC2'

# elements to be used for prediction
labels = []

'''
using 5 most negatively and positively correlated values to predict the values of Cu and Ag
'''

for element in matrix.nsmallest(5, 'Cu')['Cu'].index.tolist():
    labels.append(element)
for element in matrix.nlargest(5, 'Cu')['Cu'].index.tolist():
    labels.append(element)


y = data['Cu']
X = data[labels]

#20% data to be used for testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)

scaler = StandardScaler()

train_scaled = scaler.fit_transform(X_train)
test_scaled = scaler.transform(X_test)

model = 'Get input from Front end, which model to choose'
if model == 'LR':
    model = LinearRegression(normalize=True)
else:
    model = MLPClassifier()

model.fit(train_scaled, y_train)

# Training Data mean squared error and mean absolute error
# If the testing metrics are too high, reject the model
mse = mean_squared_error(y_train, model.predict(train_scaled))
mae = mean_absolute_error(y_train, model.predict(train_scaled))

# Test Data MSE and MAE
test_mse = mean_squared_error(y_test, model.predict(test_scaled))
test_mae = mean_absolute_error(y_test, model.predict(test_scaled))



'''
for user client, 
can show MAE on website for easier understanding
'''
