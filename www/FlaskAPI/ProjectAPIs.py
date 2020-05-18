from flask import jsonify, request, session, send_file
from flask_restful import Resource
from .Global_func import Database, mustlist, CheckUser
import random
import os
import string
from pathlib import Path
from os.path import dirname, abspath
PATH = 'Project_and_user_Files'
REPORT_PATH='Reports'

class CreateProject(Resource):
    def post(self):
        if CheckUser() == False:
            return False
        json_data = request.get_json(force=True)
        if mustlist(json_data, ['ProjectName']) and len(json_data['ProjectName']) < 200:
            try:
                db = Database()
                db.Insert_Project_data(
                    session['uid'], json_data['ProjectName'])
                db.end_connection()
                return True
            except:
                return False
        else:
            return False


class ListProjects(Resource):
    def get(self):
        if CheckUser() == False:
            return False
        listOfProjects = []
        try:
            db = Database()
            listOfProjects = db.list_Projects(session['uid'])
            db.end_connection()
        except:
            return False
        return jsonify(Projects=listOfProjects)


class UploadFile(Resource):
    def post(self, ProjectName):
        if CheckUser() == False:
            return False
        if 'file' not in request.files:
            return 'jjg'
        file = request.files['file']
        if file.filename == '':
            return 'jgnbgjfbg'
        N = 20
        d = dirname(dirname(abspath(__file__)))
        path = os.path.join(d, PATH)

        new_file_name = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=N))+".csv"
        while Path(os.path.join(path, new_file_name)).is_file():
            new_file_name = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=N))+".csv"
        db = Database()
        if db.createFile(file.filename, new_file_name, ProjectName, session['uid']):
            db.end_connection()
            file.save(os.path.join(path, new_file_name))
            return True
        else:
            db.end_connection()
            return 'ttttt'


class ListFiles(Resource):
    def get(self, ProjectName):
        if CheckUser() == False:
            return False
        if ProjectName and ProjectName != '':
            db = Database()
            result = db.get_list_of_files(ProjectName, session['uid'])
            db.end_connection()
            if result == False:
                return False
            else:
                return jsonify(Files=result)


class DownloadFile(Resource):
    def get(self, ProjectName, FileName):
        if CheckUser() == False:
            return False
        if ProjectName and FileName and ProjectName != '' and FileName != '':
            db = Database()
            result = db.is_User_Allowed_To_Access_File(
                ProjectName, FileName, session['uid'])
            db.end_connection()
            if result == False:
                return
            else:
                d = dirname(dirname(abspath(__file__)))
                path = os.path.join(d, PATH)
                return send_file(os.path.join(path, result), as_attachment=True, attachment_filename=FileName)

class ListProjectFiles(Resource):
    def get(self):
        if CheckUser() == False:
            return False
        listOfProjects = []
        Dict_project_files=[]
        try:
            db = Database()
            listOfProjects = db.list_Projects(session['uid'])
            for ProjectName in listOfProjects:
                result = db.get_list_of_files(ProjectName, session['uid'])
                for row in result:
                    Dict_project_files.append({
                        "ProjectName":ProjectName,
                        "File":row
                    })
                if len(result)==0:
                    Dict_project_files.append({
                        "ProjectName":ProjectName,
                        "File":[]
                    })
            db.end_connection()
        except:
            return False
        return Dict_project_files


class ListReports(Resource):
    def get(self):
        if CheckUser() == False:
            return False
        try:
            db = Database()
            result=db.list_reports(session['uid'])
            db.end_connection()
        except:
            return False
        return result
class ViewReport(Resource):
    def get(self,imageName):
        if CheckUser() == False:
            return False
        try:
            db = Database()
            result=db.user_allowed_to_view(session['uid'],imageName)
            db.end_connection()
        except:
            return False
        if result == False:
            return False
        else:
            d = dirname(dirname(abspath(__file__)))
            path = os.path.join(d, REPORT_PATH)
            return send_file(os.path.join(path, imageName), as_attachment=False)