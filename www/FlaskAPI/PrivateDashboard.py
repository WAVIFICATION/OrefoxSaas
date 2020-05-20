from flask import jsonify, request, session, send_file
from flask_restful import Resource
from .Global_func import Database, mustlist, CheckUser, generatefilename
import os
import string
from pathlib import Path
from os.path import dirname, abspath
import io
PATH = 'Project_and_user_Files'
REPORT_PATH='Reports'

class ListUserProjects(Resource):
    def get(self):
        if CheckAdmin() == False:
            return False
        try:
            db = Database()
            result=db.admin_list_project_files()
            db.end_connection()
        except:
            return False
        return result
class ListFeedbacks(Resource):
    def get(self):
        if CheckAdmin() == False:
            return False
        try:
            db = Database()
            result=db.admin_list_feedbacks()
            db.end_connection()
        except:
            return False
        return result
class NumberOfProjects(Resource):
    def get(self):
        if CheckAdmin() == False:
            return False
        try:
            db = Database()
            result=db.admin_number_of_projects()
            db.end_connection()
        except:
            return False
        return result

def CheckAdmin():
    if "email" in session and session["uid"]==10:
        values = {
            "name": session["name"],
            "email": session["email"]}
        return values
    else:
        return False
    # session['uid']=2
    # return True