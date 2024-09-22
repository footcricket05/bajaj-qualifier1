import base64
import mimetypes
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def validate_file(file_b64):
    try:
        file_bytes = base64.b64decode(file_b64)
        file_size_kb = len(file_bytes) / 1024
        file_mime_type = mimetypes.guess_type("dummyfile")[0]  # Adjust as needed
        return True, file_mime_type, file_size_kb
    except Exception:
        return False, None, 0

@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        data = request.json.get('data', [])
        file_b64 = request.json.get('file_b64', '')

        # Separate numbers and alphabets
        numbers = [x for x in data if x.isdigit()]
        alphabets = [x for x in data if x.isalpha()]

        # Find the highest lowercase alphabet
        lowercase_alphabets = [x for x in alphabets if x.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else ""

        # Handle file
        file_valid, file_mime_type, file_size_kb = validate_file(file_b64) if file_b64 else (False, None, 0)

        response = {
            "is_success": True,
            "user_id": "charvijain_12092003",  # Update with correct details
            "email": "charvijain2003@gmail.com",  # Update with your actual email
            "roll_number": "RA2111047010113",  # Update with actual roll number
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else [],
            "file_valid": file_valid,
            "file_mime_type": file_mime_type if file_valid else None,
            "file_size_kb": file_size_kb if file_valid else 0
        }

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
