import requests
import subprocess,os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ELEVENLABS_API_KEY")

CHUNK_SIZE = 1024
url = "https://api.elevenlabs.io/v1/text-to-speech/TX3LPaxmHKxFdv7VOQHJ" 

headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": api_key  
}

# Take text from audio.txt
with open('../Generation/data/audio.txt', 'r') as f:
    text_to_convert = f.read()

data = {
    "text": text_to_convert,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
    }
}

response = requests.post(url, json=data, headers=headers)

if response.status_code == 200:
    # Save the audio to a file
    with open('../Generation/audio/output.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)
    print("Text-to-speech conversion successful. Audio saved as 'output.mp3'.")
    subprocess.call(['python3', 'explain.py'])
else:
    print(f"Text-to-speech conversion failed with status code: {response.status_code}")
    print(response.text)
