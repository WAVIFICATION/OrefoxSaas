from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route('/')
@app.route('/index')
def main():
    return render_template('index.html', title ="Home")


@app.route('/UserReg')
def display_signup():
    return render_template('UserReg.html')


@app.route('/UserReg', methods=['POST'])
def signup():
    first_Name = request.form['first_name']
    last_Name = request.form['last_name']
    email = request.form['email']
    pswH = request.form['psw']
    psw_repeat = request.form['psw-repeat']

    if first_Name and last_Name and email and pswH and psw_repeat:
        return json.dumps({'html':'<span> All entries ok! </span>'})
    else:
        return json.dumps({'html':'<span> Enter all fields</span>'})
        
        



if __name__ =="__main__":
    app.run()