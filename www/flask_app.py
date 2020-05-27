from flask import Flask, request
from flask_restful import Api, Resource
from FlaskAPI.UserLoginAPIs import SignUp, TestAPI, SignIn, CheckSignIn, password_recovery_api_endpoint, ResetPassword, SignOut, Feedback
from FlaskAPI.ProjectAPIs import CreateProject, ListProjects, UploadFile, ListFiles, DownloadFile, ListProjectFiles, ListReports, ViewReport
from flask_mail import Mail, Message
from FlaskAPI.AnalyticsAPIs import AnalyticsAPI, LinearRegression, KdePlot
from FlaskAPI.PrivateDashboard import ListFeedbacks, ListUserProjects, NumberOfProjects, Check_for_Admin
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)
cors = CORS(app,supports_credentials=True)
app.secret_key="fvdfjhvb fdhvfdvljfdnvjfdnv;kdfjnv"
app.config.update(
	MAIL_SERVER='smtp.yandex.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'orefoxsaas@yandex.com',
	MAIL_PASSWORD = 'Project123',
    #SESSION_COOKIE_SAMESITE = 'None',
    SESSION_REFRESH_EACH_REQUEST = True,
    SESSION_COOKIE_NAME= 'Orefox',
	)
mail = Mail(app)
class ForgotPassword(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        rand_str=password_recovery_api_endpoint(json_data)
        if rand_str == False:
            return False
        else:
            try:
                msg = Message("Password Recovery Email- OrefoxSaaS",
                sender="orefoxsaas@yandex.com",
                recipients=[json_data["email"]])
                msg.body = "Hi,\n Click link below to reset password. \n http://localhost:3000/passwordReset?Randstr="+rand_str+" \n Do not reply as this is an automated email. \n Regards, \nOrefoxSaaS support"           
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
api.add_resource(AnalyticsAPI, '/api/AnalyticsAPI')
api.add_resource(ListProjectFiles, '/api/ListProjectFiles')
api.add_resource(ListReports, '/api/ListReports')
api.add_resource(ViewReport, '/api/ViewReport/<string:imageName>')
api.add_resource(SignOut, '/api/SignOut')
api.add_resource(Feedback, '/api/Feedback')
api.add_resource(LinearRegression, '/api/Analytic/LinearRegression/<string:ProjectName>/<string:FileName>')
api.add_resource(KdePlot, '/api/Analytic/KdePlot/<string:ProjectName>/<string:FileName>')
api.add_resource(ListFeedbacks, '/api/private/ListFeedbacks')
api.add_resource(ListUserProjects, '/api/private/ListUserProjects')
api.add_resource(NumberOfProjects, '/api/private/NumberOfProjects')
api.add_resource(Check_for_Admin, '/api/private/Check_for_Admin')

if __name__ == "__main__":
    app.run(host="0.0.0.0")