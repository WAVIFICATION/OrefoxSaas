import pymysql
from flask import jsonify, request, session
import random
import os
import string
from pathlib import Path


def mustlist(jsondata, mustlst):
    return all(item in jsondata for item in mustlst)


def CheckUser():
    if "email" in session:
        values = {
            "name": session["name"],
            "email": session["email"]}
        return values
    else:
        return False
    # session['uid']=2
    return True


def generatefilename(path, N, extension):
    new_file_name = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=N))+extension
    while Path(os.path.join(path, new_file_name)).is_file():
        new_file_name = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=N))+extension
    return new_file_name


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

    def Insert_Project_data(self, uid, projectid):
        self.cur.execute(
            "INSERT INTO Project (Uid, ProjectName) VALUES ('{}','{}');".format(uid, projectid))
        self.con.commit()
        return

    def list_Projects(self, uid):
        self.cur.execute("SELECT * FROM Project WHERE Uid='{}';".format(uid))
        self.con.commit()
        result = self.cur.fetchall()
        projects = []
        for rows in result:
            projects.append(rows["ProjectName"])
        return projects

    def createFile(self, filename, randfilename, projectname, uid):
        self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        try:
            result[0]['ProjectID']
        except:
            return False
        self.cur.execute("INSERT INTO Files (FileID, ProjectID, OriginalName) VALUES ('{}','{}','{}');".format(
            randfilename, result[0]['ProjectID'], filename))
        self.con.commit()
        return True

    def get_list_of_files(self, projectname, uid):
        row_count = self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        if(row_count > 0):
            row_count = self.cur.execute(
                "SELECT OriginalName FROM Files WHERE ProjectID ='{}'".format(result[0]['ProjectID']))
            self.con.commit()
            result = self.cur.fetchall()
            listOfFileNames = []
            if(row_count > 0):
                for file_names in result:
                    listOfFileNames.append(file_names["OriginalName"])
            return listOfFileNames
        else:
            return False

    def is_User_Allowed_To_Access_File(self, projectname, filename, uid):
        row_count = self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectname))
        self.con.commit()
        result = self.cur.fetchall()
        if(row_count == 0):
            return False
        row_count = self.cur.execute("SELECT FileID FROM Files WHERE ProjectID ='{}' and OriginalName='{}'".format(
            result[0]['ProjectID'], filename))
        self.con.commit()
        result = self.cur.fetchall()
        if row_count == 0:
            return False
        else:
            return result[0]['FileID']

    def add_random_string(self, email, rand_string):
        row_count = self.cur.execute(
            "UPDATE UserData SET random_string='"+rand_string+"' WHERE email='"+email+"';")
        self.con.commit()
        if(row_count == 0):
            return False
        return True

    def reset_password(self, rand_string, password):
        row_count = self.cur.execute("UPDATE UserData SET password_hash='" +
                                     password+"', random_string=NULL WHERE  random_string='"+rand_string+"';")
        self.con.commit()
        if(row_count == 0):
            return False
        return True

    def save_to_db_report(self, projectName, fileid, uid, operation, reportname):
        row_count = self.cur.execute(
            "SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid, projectName))
        self.con.commit()
        result = self.cur.fetchall()
        print("INSERT INTO Reports (FileID, ProjectID, Uid, ReportID, Operation) VALUES ('{}','{}','{}','{}','{}');".format(
            fileid, result[0]['ProjectID'], uid, reportname, operation))
        row_count = self.cur.execute("INSERT INTO Reports (FileID, ProjectID, Uid, ReportID, Operation) VALUES ('{}','{}','{}','{}','{}');".format(
            fileid, result[0]['ProjectID'], uid, reportname, operation))

        self.con.commit()

    def list_reports(self, uid):
        row_count = self.cur.execute(
            "SELECT ProjectName,OriginalName,Operation,ReportID FROM ((Reports INNER JOIN Project ON Reports.ProjectID = Project.ProjectID) INNER JOIN Files ON Reports.FileID=Files.FileID) where Reports.Uid='{}'".format(uid))
        self.con.commit()
        result = self.cur.fetchall()
        return result
    def user_allowed_to_view(self,uid,reportname):
        row_count = self.cur.execute("SELECT * FROM Reports where Uid='{}' and ReportID='{}'".format(uid,reportname))
        self.con.commit()
        if  row_count==0:
            return False
        else:
            return True