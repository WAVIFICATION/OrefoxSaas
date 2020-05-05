from flask import jsonify, request, session
from flask_restful import Resource
from .Global_func import Database, mustlist
import random
import os
import string
from pathlib import Path
from os.path import dirname, abspath
PATH='Project_and_user_Files'
class CreateProject(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        if mustlist(json_data,['ProjectName']) and len(json_data['ProjectName'])<200:
            try:
                db= Database()
                db.Insert_Project_data(session['uid'], json_data['ProjectName'])
                db.end_connection()
                return True
            except:
                return False
        else:
            return False
class ListProjects(Resource):
    def get(self):
        listOfProjects=[]
        try:
            db=Database()
            listOfProjects=db.list_Projects(session['uid'])
            db.end_connection()
        except:
            return False
        return jsonify(Projects=listOfProjects)
        

class UploadFile(Resource):
    def post(self,Project_id):
        if  'file' not in request.files:
            return False
        file = request.files['file']
        if  file.filename == '':
            return False
        N=20
        d = dirname(dirname(abspath(__file__)))
        path=os.path.join(d,PATH)

        new_file_name=''.join(random.choices(string.ascii_uppercase + string.digits, k=N))+".csv"
        while Path(os.path.join(path,new_file_name)).is_file():
            new_file_name=''.join(random.choices(string.ascii_uppercase + string.digits, k=N))+".csv"
        db=Database()
        if db.createFile(file.filename, new_file_name,Project_id,session['uid']):
            file.save(os.path.join(path,new_file_name))
            return True
        else:
            return False
            

# def createRandFileName():