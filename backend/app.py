from flask import Flask, request, send_file, redirect, render_template, jsonify
from translator import process_audio

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login_user():
    # Always succeed login for any username/password
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/translate', methods=['POST'])
def translate_audio():
    file = request.files['audio']
    src = request.form['sourceLang']
    dest = request.form['targetLang']
    output = process_audio(file, src, dest)
    return send_file(output, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
