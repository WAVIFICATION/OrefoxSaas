from flask import jsonify, request
import mysql.connector
from flask_restful import Resource
import pymysql
import bcrypt


class Signin(Resource):
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
        return str(request)
    def post(self):
        return str(request)


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
        print(self.cur.execute("INSERT INTO UserData (firstname, lastname, email, company, password_hash) VALUES ('{}','{}','{}','{}','{}');".format(
            data["fname"], data["lname"], data["email"], data["company"], data["password"])))
        self.con.commit()
        result = self.cur.fetchall()
        return result
    def end_connection(self):
        self.cur.close()
        self.con.close()
