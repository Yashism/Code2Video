import requests
import json, os, subprocess

# Set the API key and limit
apikey = "AIzaSyDqOScgUKmBj0glykT7QR7Bnc_gT7XbM70"  # Replace with your API key
lmt = 1
ckey = "Code2Video"  # Set the client_key for the integration

# Directory to save GIFs
save_dir = "../Generation/gifs/"
os.makedirs(save_dir, exist_ok=True)

# Read search terms from a text file
with open('../Generation/data/gif_keyword.txt', 'r') as file:
    search_terms = file.readlines()

# Remove newline characters from each search term
search_terms = [term.strip() for term in search_terms]

# Search for each term and print top GIFs
for search_term in search_terms:
    print(f"Searching for GIFs for search term: {search_term}")
    response = requests.get(
        "https://tenor.googleapis.com/v2/search?q=%s&key=%s&client_key=%s&limit=%s" % (search_term, apikey, ckey, lmt))

    if response.status_code == 200:
        top_gifs = json.loads(response.content)
        if top_gifs['results']:
            gif_url = top_gifs['results'][0]['media_formats']['gif']['url']
            gif_response = requests.get(gif_url)
            if gif_response.status_code == 200:
                gif_count = len([name for name in os.listdir(save_dir) if os.path.isfile(os.path.join(save_dir, name)) and name.endswith('.gif')]) + 1
                with open(os.path.join(save_dir, f"gif_{str(gif_count).zfill(2)}.gif"), 'wb') as f:
                    f.write(gif_response.content)
    else:
        print(f"Failed to retrieve GIFs for search term: {search_term}")
        
print("Generating images...")
print("Generating audio...")
subprocess.call(["python3", "concept_image_gen.py"])