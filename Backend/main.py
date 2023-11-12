from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/generate_video', methods=['POST'])
def generate_video():
    content = request.json
    print(content)
    input_type = content.get('type')
    
    if input_type == 'code':
        # Save the code to a file and call a script
        code = content.get('code', '')
        with open('../Generation/data/code.txt', 'w') as code_file:
            code_file.write(code)
        subprocess.call(["python3", "code_script.py", '../Generation/data/code.txt'])
    else:
        # Directly pass the text to the script
        text = content.get('text', '')
        with open('../Generation/data/concept_input.txt', 'w') as concept_file:
            concept_file.write(text)
        subprocess.call(["python3", "concept_script.py", '../Generation/data/concept_input.txt'])
    
    # Your video generation logic here
    
    # Assuming the video is saved as output.mp4 in static folder
    return jsonify({'video_url': '../Generation/videos/output_video.mp4'})


if __name__ == '__main__':
    app.run(debug=True)
