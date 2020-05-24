from flask import jsonify, request, session, send_file, make_response
from flask_restful import Resource, reqparse
from .Global_func import Database, mustlist, CheckUser, generatefilename
from .BasicAnalyticsLib import data_cleaning, correlation_maps, address_linear_regression, linear_regression
import os
import string
from pathlib import Path
from os.path import dirname, abspath
import pandas as pd
import io
PATH = 'Project_and_user_Files'
REPORT_PATH='Reports'
operationMapping={
    "correlation_map": correlation_maps,
    "linear_regression": address_linear_regression
}

class AnalyticsAPI(Resource):
    def post(self):
        if CheckUser() == False:
            return False
        json_data = request.get_json(force=True)
        if mustlist(json_data, ['projectName','fileName','operation']):
            #getfilename
            try:
                db = Database()
                fileID=db.is_User_Allowed_To_Access_File(json_data['projectName'], json_data['fileName'], session['uid'])
                db.end_connection()
            except:
                return False
            if fileID==False:
                return False
            d = dirname(dirname(abspath(__file__)))
            path = os.path.join(d, PATH)
            df = pd.read_csv(path+"/"+fileID)

            df = data_cleaning(df)
            
            if json_data['operation'] in operationMapping.keys():
                result, category =operationMapping[json_data['operation']](df)
            else: 
                return False
            if category== 'plot':#plot specific
                path = os.path.join(d, REPORT_PATH)
                new_file_name=generatefilename(path, 30, ".png")
                result.savefig(os.path.join(path, new_file_name), format='png')
                new_file_name='/api/ViewReport/'+new_file_name
            elif category == 'url':
                new_file_name=result+'/'+json_data['projectName']+'/'+json_data['fileName']
            # try:
            db = Database()
            db.save_to_db_report(json_data['projectName'],fileID,session['uid'],json_data['operation'],new_file_name)
            db.end_connection()
            # except:
            #     return False
            return True
        else:
            return False
class LinearRegression(Resource):
    def get(self, ProjectName, FileName):
        # return 'hai'
        X = request.args.get('x')
        Y = request.args.get('y')
        headers = {'Content-Type': 'text/html'} 
        try:
            db = Database()
            fileID=db.is_User_Allowed_To_Access_File(ProjectName, FileName, session['uid'])
            db.end_connection()
        except:
            return False
        if fileID==False:
            return False
        d = dirname(dirname(abspath(__file__)))
        path = os.path.join(d, PATH)
        df = pd.read_csv(path+"/"+fileID)
        df = data_cleaning(df)
        
        optionList=''
        image_src=''
        for i in list(df.columns.values):
            optionList+='<option value="'+i+'">'+i+'</option>'
        if X != None:
            image_src='<img src="data:image/png;base64,'+linear_regression(X,Y,df).decode('utf-8')+'" alt="img" />'
        return make_response("""
        <html>
        <form action="/api/Analytic/LinearRegression/"""+ProjectName+'/'+FileName+"""" method="get" >
            X=
            <select id="x" name="x">
            """+optionList+"""
            </select>
            Y=
            <select id="y" name="y">
            """+optionList+"""
            </select>
            <input type="submit" value="Submit">
        </form>
        """+image_src+"""
        </html>""")