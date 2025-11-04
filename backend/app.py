from flask import Flask, request, send_file, redirect, render_template, jsonify
import os
from translator import process_audio

app = Flask(__name__, template_folder='templates')

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login_user():
    # Simplified login - accepts all users
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/translate', methods=['POST'])
def translate_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file uploaded'}), 400

        file = request.files['audio']
        src = request.form.get('sourceLang')
        dest = request.form.get('targetLang')

        if not src or not dest:
            return jsonify({'error': 'Missing source or target language'}), 400

        output_path = process_audio(file, src, dest)

        if not output_path or not os.path.exists(output_path):
            return jsonify({'error': 'Translation failed or file not found'}), 500

        return send_file(output_path, mimetype='audio/mpeg')

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
