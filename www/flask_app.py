from flask import Flask, request
from flask_restful import Api
from FlaskAPI.UserLoginAPIs import SignUp, TestAPI, SignIn, CheckSignIn

app = Flask(__name__)
api = Api(app)
app.secret_key="fvdfjhvb fdhvfdvljfdnvjfdnv;kdfjnv"


api.add_resource(SignUp, '/api/SignUp')
api.add_resource(TestAPI, '/api/TestAPI')
api.add_resource(SignIn, '/api/SignIn')
api.add_resource(CheckSignIn, '/api/CheckSignIn')

if __name__ == "__main__":
    app.run(host="0.0.0.0")