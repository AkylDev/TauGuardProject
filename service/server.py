from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if 'url' not in data:
        return jsonify({"error": "URL is required"}), 400

    test_url = data['url']
    result = subprocess.run(["python", "service/test.py", test_url], capture_output=True, text=True)

    prediction = result.stdout.strip().split("\n")[-1]
    print(f"Final Prediction: {prediction}")

    return jsonify({"result": prediction})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
