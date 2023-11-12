import requests
import os
import shutil
import subprocess

api_key = '<Key>'
limit = 1  # Number of results you want to retrieve

# Define the API endpoint URL
url = 'https://api.giphy.com/v1/gifs/search'

# Create gifs directory if it doesn't exist
if not os.path.exists('gifs'):
    os.makedirs('gifs')

# Read keywords from the file
with open('../Generation/data/gif_keyword.txt', 'r') as f:
    keywords = f.read().split(',')

# For each keyword, fetch and save a GIF
for keyword in keywords:
    keyword = keyword.strip()  # Remove leading/trailing whitespace

    # Set the request parameters
    params = {
        'api_key': api_key,
        'q': keyword,
        'limit': limit,
        'rating': 'g'
    }

    try:
        # Send the GET request to the GIPHY API
        response = requests.get(url, params=params)

        # Check if the request was successful (HTTP status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            gifs = data['data']

            # Get the URL of the original GIF
            gif_url = gifs[0]['images']['original']['url']
            response = requests.get(gif_url, stream=True)  # Send a GET request to the GIF's URL

            # Check if the request was successful
            if response.status_code == 200:
                # Open a file in write-binary mode and save the GIF
                with open(f'../Generation/gifs/{keyword}.gif', 'wb') as out_file:
                    shutil.copyfileobj(response.raw, out_file)
            else:
                print(f'Error: {response.status_code}')
        else:
            print(f'Error: {response.status_code}')
    except Exception as e:
        print(f'An error occurred: {str(e)}')
        
print("Generating images...")
print("Generating audio...")
subprocess.call(["python3", "concept_image_gen.py"])