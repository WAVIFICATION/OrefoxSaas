from flask import jsonify, request, session
from flask_restful import Resource
import pymysql
import bcrypt
import json
from .Global_func import Database, CheckUser, mustlist
import random
import os
import string


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

def password_recovery_api_endpoint(json_data):
    if CheckUser() == True:
        return False
    else:
        if mustlist(json_data, ['email']):
            N=24
            rand_str=''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
            try:
                db = Database()
                row_count = db.add_random_string(json_data["email"],rand_str)
                db.end_connection()
            except:
                return False
            return rand_str
        else:
            return False

class ResetPassword(Resource):
    def post(self):
        if CheckUser() == True:
            return False
        else:
            json_data = request.get_json(force=True)
            salt = bcrypt.gensalt()
            if mustlist(json_data, ['password','rand_str']):
                json_data["password"] = bcrypt.hashpw(json_data["password"].encode('utf-8'), salt)
                json_data["password"] = json_data["password"].decode('utf-8')
                try:
                    db = Database()
                    row_count = db.reset_password(json_data["rand_str"],json_data["password"])
                    db.end_connection()
                except:
                    return False
                if row_count==True:
                    return True
            return False
            