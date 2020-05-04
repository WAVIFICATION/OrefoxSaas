from flask import jsonify, request, session
from flask_restful import Resource
import pymysql
import bcrypt
import json


class SignUp(Resource):
    def post(self):
        salt = bcrypt.gensalt()
        json_data = request.get_json(force=True)
        must_list=["fname","lname","email","company","password"]
        if all(item in json_data for item in must_list):
            json_data["password"]=bcrypt.hashpw(json_data["password"].encode('utf-8'), salt)
            json_data["password"]=json_data["password"].decode('utf-8')
            try:
                db= Database()
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
        must_list=["email","password"]
        if all(item in json_data for item in must_list):
            try:
                db= Database()
                expected_pswd=db.Get_user_cred(json_data["email"])
                db.end_connection()
            except:
                return False
            expected_pswd=expected_pswd[0]
            if bcrypt.checkpw(json_data["password"].encode('utf-8'),expected_pswd["password_hash"].encode('utf-8')):
                session["email"]=json_data["email"]
                session["name"]=expected_pswd["firstname"]+expected_pswd["lastname"]
                return True
            else:
                return False
        else:
            return False
class CheckSignIn(Resource):
    def get(self):
        if "email" in session:
            values={
                "name":session["name"],
                "email":session["email"]
            }
            return values
        else:
            return False

class Database:
    def __init__(self):
        host = "generaldb.cuqt2fxorqci.ap-southeast-2.rds.amazonaws.com"
        user = "admin"
        password = "Project123"
        db = "generaldb"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    def Insert_user_data(self, data):
        self.cur.execute("INSERT INTO UserData (firstname, lastname, email, company, password_hash) VALUES ('{}','{}','{}','{}','{}');".format(
            data["fname"], data["lname"], data["email"], data["company"], data["password"]))
        self.con.commit()
        result = self.cur.fetchall()
        return result
    def end_connection(self):
        self.cur.close()
        self.con.close()
    def Get_user_cred(self, email):
        self.cur.execute("SELECT * FROM UserData WHERE email='"+email+"';")
        self.con.commit()
        result = self.cur.fetchall()
        return result