import os
import requests
import subprocess

# Ensure you have your Shutterstock API Token set in your environment variables
# or directly replace os.getenv('SHUTTERSTOCK_API_TOKEN') with your token string.
api_token = "v2/Y3pCQklGUUhIck83bEFMWmxsY2lpUW1ZZ0lTSVhnRXUvNDExMTQ2MzIzL2N1c3RvbWVyLzQvdnJBNkFfbi1fb3NnWGVEU0Z3VTlRSF9tRE8yY0hSVlExSXdfdTJWQ093ejlwUy1DZEFxR0VMSjlmcmFpMlBmX1VfM0l1TnhBSWo4ZGY3MDFZWHJLVGRrVDZ4Wl9LRGJscHllMVQ1T1RZb09Fb3pFUnZXZXFVTTBfT3FiaGY0OWl0Y0JITnJoVXlaZEtoNUF1R29nSVh0VG9aVWpaV3ZGMnh1c2hLWkkwdmI3Qm91U3g2VTJ2RVdKTXRFYjR2YjFFZGtUYWpCajZtRXluWVdEdl9McktzQS9IYXRCa21ieGU3clNVdjBYSkVRcXdB"
headers = {
    'Authorization': f'Bearer {api_token}'
}

# Make sure the images directory exists
os.makedirs('../Generation/images/', exist_ok=True)
image_directory = '../Generation/images/'

# Read keywords from a file
try:
    with open('gif_keyword.txt', 'r') as file:
        # Split the file contents by comma and strip whitespace
        keywords = [keyword.strip() for keyword in file.read().split(',')]
except FileNotFoundError:
    print('The keyword file does not exist.')
    exit(1)

# Function to call the Shutterstock API and download images
def search_and_download_images(query):
    params = {
        'query': query,
    }

    response = requests.get('https://api.shutterstock.com/v2/images/search', headers=headers, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        images = response.json().get('data', [])
        if images:
            # Take the first image from the list
            image = images[0]
            image_url = image['assets']['preview']['url']
            image_response = requests.get(image_url)
            print(f'Downloading image {image_url}')
            
            if image_response.status_code == 200:
                filename = os.path.join(image_directory, f'{query}.jpg')  # No need for a counter
                with open(filename, 'wb') as f:
                    f.write(image_response.content)
                print(f'Downloaded {filename}')
                print('Image saved at:', os.path.abspath(filename))
            else:
                print(f'Failed to download image {image_url}')
        else:
            print(f'No images found for keyword: "{query}"')
    else:
        print(f'Failed to search Shutterstock API: {response.status_code}')
        print(response.text)
# Loop through the keywords and download images for each
for keyword in keywords:
    print(f'Searching and downloading images for {keyword}')
    search_and_download_images(keyword)

print('Done searching and downloading images.')
subprocess.call(["python3", "tts.py"])