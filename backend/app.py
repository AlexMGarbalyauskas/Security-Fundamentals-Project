from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the CyberSecurity Team Project Backend!"

# Sample route
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello, world!")

# Example route to accept POST data
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    return jsonify(data=data, message="Data received successfully!")

if __name__ == '__main__':
    app.run(debug=True)  # This runs the server at http://127.0.0.1:5000