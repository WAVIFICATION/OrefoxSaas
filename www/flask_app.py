from flask import Flask, request
from flask_restful import Api, Resource
from FlaskAPI.UserLoginAPIs import SignUp, TestAPI, SignIn, CheckSignIn, password_recovery_api_endpoint, ResetPassword
from FlaskAPI.ProjectAPIs import CreateProject, ListProjects, UploadFile, ListFiles, DownloadFile
from flask_mail import Mail, Message
app = Flask(__name__)
api = Api(app)
app.secret_key="fvdfjhvb fdhvfdvljfdnvjfdnv;kdfjnv"
app.config.update(
	MAIL_SERVER='smtp.yandex.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'orefoxsaas@yandex.com',
	MAIL_PASSWORD = 'Project123'
	)
mail = Mail(app)
class ForgotPassword(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        rand_str=password_recovery_api_endpoint(json_data)
        if rand_str == False:
            return False
        else:
            try:
                msg = Message("Password Recovery Email- OrefoxSaaS",
                sender="orefoxsaas@yandex.com",
                recipients=[json_data["email"]])
                msg.body = "Hi,\n Click link below to reset password. \n http://54.252.132.199/ResetPassword?Randstr="+rand_str+" \n Do not reply as this is an automated email. \n Regards, \nOrefoxSaaS support"           
                mail.send(msg)
                return True
            except:
                return False 

api.add_resource(SignUp, '/api/SignUp')
api.add_resource(TestAPI, '/api/TestAPI')
api.add_resource(SignIn, '/api/SignIn')
api.add_resource(CheckSignIn, '/api/CheckSignIn')
api.add_resource(CreateProject, '/api/CreateProject')
api.add_resource(ListProjects, '/api/ListProjects')
api.add_resource(UploadFile, '/api/UploadFile/<string:ProjectName>')
api.add_resource(ListFiles, '/api/ListFiles/<string:ProjectName>')
api.add_resource(DownloadFile, '/api/DownloadFile/<string:ProjectName>/<string:FileName>')
api.add_resource(ForgotPassword, '/api/ForgotPassword')
api.add_resource(ResetPassword, '/api/ResetPassword')

if __name__ == "__main__":
    app.run(host="0.0.0.0")