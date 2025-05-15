from flask import Flask, request, send_file
import requests
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug = True  # Enable debugging

API_KEY = 'QgD5AEjBnYLSzhRTtWWVYFc8'  # Replace this with your actual API key

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return 'No image part', 400

    image_file = request.files['image']
    if image_file.filename == '':
        return 'No selected file', 400

    try:
        # Read the image file
        image_data = image_file.read()

        # Prepare the request to remove.bg API
        files = {'image_file': image_data}
        data = {'size': 'auto'}

        # Make the request to remove.bg API
        response = requests.post(
            'https://api.remove.bg/v1.0/removebg',
            files=files,
            data=data,
            headers={'X-Api-Key': API_KEY}
        )

        if response.status_code == 200:
            # Return the processed image
            return send_file(BytesIO(response.content), mimetype='image/png')
        else:
            return f"Error processing image: {response.text}", response.status_code

    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(port=5173)  # Ensure Flask runs on port 5173
