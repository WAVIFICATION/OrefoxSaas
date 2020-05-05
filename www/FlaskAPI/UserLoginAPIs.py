from flask import jsonify, request, session
from flask_restful import Resource
import pymysql
import bcrypt
import json
from .Global_func import Database, CheckUser


class SignUp(Resource):
    def post(self):
        salt = bcrypt.gensalt()
        json_data = request.get_json(force=True)
        must_list = ["fname", "lname", "email", "company", "password"]
        if all(item in json_data for item in must_list):
            json_data["password"] = bcrypt.hashpw(
                json_data["password"].encode('utf-8'), salt)
            json_data["password"] = json_data["password"].decode('utf-8')
            try:
                db = Database()
                db.Insert_user_data(json_data)
                db.end_connection()
            except:
                return False
            return True
        else:
            return False


class TestAPI(Resource):
    def get(self):
        return str(request.get_json(force=True))

    def post(self):
        return str(request.get_json(force=True))


class SignIn(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        must_list = ["email", "password"]
        if all(item in json_data for item in must_list):
            try:
                db = Database()
                expected_pswd = db.Get_user_cred(json_data["email"])
                db.end_connection()
            except:
                return False
            try:
                expected_pswd = expected_pswd[0]
            except:
                return False
            if bcrypt.checkpw(json_data["password"].encode('utf-8'), expected_pswd["password_hash"].encode('utf-8')):
                session["email"] = json_data["email"]
                session["name"] = expected_pswd["firstname"] + \
                    " "+expected_pswd["lastname"]
                session['uid'] = expected_pswd['id']
                return True
            else:
                return False
        else:
            return False


class CheckSignIn(Resource):
    def get(self):
        return CheckUser()
