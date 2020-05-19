from flask import jsonify, request, session, send_file
from flask_restful import Resource
from .Global_func import Database, mustlist, CheckUser, generatefilename
from .BasicAnalyticsLib import data_cleaning, correlation_maps
import os
import string
from pathlib import Path
from os.path import dirname, abspath
import pandas as pd
import io
PATH = 'Project_and_user_Files'
REPORT_PATH='Reports'
operationMapping={
    "correlation_map": correlation_maps
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
            df = pd.read_csv(path+"\\"+fileID)

            df = data_cleaning(df)
            
            if json_data['operation'] in operationMapping.keys():
                result, category =operationMapping[json_data['operation']](df)
            else: 
                return False
            if category== 'plot':#plot specific
                path = os.path.join(d, REPORT_PATH)
                new_file_name=generatefilename(path, 30, ".png")
                result.savefig(os.path.join(path, new_file_name), format='png')
            # try:
            db = Database()
            db.save_to_db_report(json_data['projectName'],fileID,session['uid'],json_data['operation'],new_file_name)
            db.end_connection()
            # except:
            #     return False
            return True
        else:
            return False