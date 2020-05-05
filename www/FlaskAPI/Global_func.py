import pymysql
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
    def Insert_Project_data(self, uid,projectid):
        self.cur.execute("INSERT INTO Project (Uid, ProjectName) VALUES ('{}','{}');".format(uid, projectid))
        self.con.commit()
        return
    def list_Projects(self, uid):
        self.cur.execute("SELECT * FROM Project WHERE Uid='{}';".format(uid))
        self.con.commit()
        result = self.cur.fetchall()
        projects=[]
        for rows in result:
            projects.append(rows["ProjectName"])
        return projects
    def createFile(self, filename, randfilename, projectname, uid):
        self.cur.execute("SELECT ProjectID FROM Project WHERE Uid='{}' AND ProjectName ='{}'".format(uid,projectname))
        self.con.commit()
        result = self.cur.fetchall()
        try:
            result[0]['ProjectID']
        except:
            return False
        self.cur.execute("INSERT INTO Files (FileID, ProjectID, OriginalName) VALUES ('{}','{}','{}');".format(randfilename, result[0]['ProjectID'], filename))
        self.con.commit()
        return True

def mustlist(jsondata, mustlst):
    return all(item in jsondata for item in mustlst)