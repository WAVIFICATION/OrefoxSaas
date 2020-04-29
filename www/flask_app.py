from flask import Flask, request
from flask_restful import Api
from FlaskAPI.UserLoginAPIs import Signin

app = Flask(__name__)
api = Api(app)


api.add_resource(Signin, '/api/Signin')

if __name__ == "__main__":
    app.run(host="0.0.0.0")