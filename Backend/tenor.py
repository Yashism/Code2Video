import shutil
import requests
import os

# # Define your Tenor API key
# api_key = "AIzaSyDqOScgUKmBj0glykT7QR7Bnc_gT7XbM70"

# # Set the content rating to 'g' for general audiences
# content_rating = 'g'

# # Create a directory to save the GIFs
# if not os.path.exists('gifs'):
#     os.makedirs('gifs')

# # List of keywords to search for GIFs
# keywords = ['recursion', 'stack', 'queue']

# # Set the base URL for the Tenor API
# base_url = 'https://g.tenor.com/v1/search'

# for keyword in keywords:
#     # Define the request parameters
#     params = {
#         'key': api_key,
#         'q': keyword,
#         'limit': 1,  # Number of results you want to retrieve
#         'contentfilter': content_rating,  # Set content rating to 'g'
#     }

#     try:
#         # Send the GET request to the Tenor API
#         response = requests.get(base_url, params=params)

#         # Check if the request was successful (HTTP status code 200)
#         if response.status_code == 200:
#             data = response.json()
#             gifs = data['results']

#             # Get the URL of the first GIF
#             gif_url = gifs[0]['media'][0]['gif']['url']

#             # Download and save the GIF
#             response = requests.get(gif_url, stream=True)
#             if response.status_code == 200:
#                 with open(f'gifs/{keyword}.gif', 'wb') as out_file:
#                     shutil.copyfileobj(response.raw, out_file)
#             else:
#                 print(f'Error downloading GIF: {response.status_code}')
#         else:
#             print(f'Error in API request: {response.status_code}')
#     except Exception as e:
#         print(f'An error occurred: {str(e)}')

# print("GIF retrieval and saving complete.")


# # set the apikey and limit
# apikey = "AIzaSyDqOScgUKmBj0glykT7QR7Bnc_gT7XbM70"  # click to set to your apikey
# lmt = 8
# ckey = "Code2Video"  # set the client_key for the integration and use the same value for all API calls

# import requests
# import json


# # Read the keywords from the gif_keyword.txt file
# with open("../Backend/gif_keyword.txt", "r") as file:
#     keywords = file.read().split(",")

# # Get rid of leading/trailing whitespaces for each keyword
# keywords = [keyword.strip() for keyword in keywords]

# # Initialize a list to store the GIFs
# gifs = []

# # Iterate over the keywords and perform the search
# for keyword in keywords:
#     # Get the top 8 GIFs for the current keyword
#     r = requests.get(
#         "https://tenor.googleapis.com/v2/search?q=%s&key=%s&client_key=%s&limit=%s" % (keyword, apikey, ckey, lmt))

#     if r.status_code == 200:
#         # Load the GIFs using the URLs for the smaller GIF sizes
#         data = json.loads(r.content)
#         gifs.extend(data.get("results", []))
#     else:
#         print(f"Error in API request for keyword '{keyword}': {r.status_code}")

# # Print the retrieved GIFs
# print(gifs)

# import requests
# import json

# # Define your Tenor API key
# apikey = "AIzaSyDqOScgUKmBj0glykT7QR7Bnc_gT7XbM70"

# # Set the limit for the number of results you want to retrieve
# lmt = 8

# # Set the client key for the integration
# ckey = "Code2Video"

# # Read the keywords from the gif_keyword.txt file
# with open("../Backend/gif_keyword.txt", "r") as file:
#     keywords = file.read().split(",")

# # Get rid of leading/trailing whitespaces for each keyword
# keywords = [keyword.strip() for keyword in keywords]

# # Initialize a list to store the GIFs
# all_gifs = []

# # Iterate over the keywords and perform a search for each one
# for keyword in keywords:
#     # Get the top 8 GIFs for the current keyword
#     r = requests.get(
#         f"https://tenor.googleapis.com/v2/search?q={keyword}&key={apikey}&client_key={ckey}&limit={lmt}")

#     if r.status_code == 200:
#         # Load the GIFs using the URLs for the smaller GIF sizes
#         data = json.loads(r.content)
#         gifs = data.get("results", [])
#         all_gifs.extend(gifs)
#     else:
#         print(f"Error in API request for keyword '{keyword}': {r.status_code}")

# # Print or process the retrieved GIFs as needed
# print(all_gifs)

import requests
import json
import os
import shutil

# Define your Tenor API key
apikey = "<Key>"

# Set the limit for the number of results you want to retrieve
lmt = 8

# Set the client key for the integration
ckey = "Code2Video"

# Create the 'Generation' folder if it doesn't exist
generation_folder = "Generation/gifs"
if not os.path.exists(generation_folder):
    os.makedirs(generation_folder)

# Create the 'gifs' folder inside the 'Generation' folder if it doesn't exist
gifs_folder = os.path.join(generation_folder, "gifs")
if not os.path.exists(gifs_folder):
    os.makedirs(gifs_folder)

# Read the keywords from the gif_keyword.txt file
with open("../Backend/gif_keyword.txt", "r") as file:
    keywords = file.read().split(",")

# Get rid of leading/trailing whitespaces for each keyword
keywords = [keyword.strip() for keyword in keywords]

# Initialize a list to store the GIF URLs
gif_urls = []

# Iterate over the keywords and perform a search for each one
for keyword in keywords:
    # Get the top 8 GIFs for the current keyword
    r = requests.get(
        f"https://tenor.googleapis.com/v2/search?q={keyword}&key={apikey}&client_key={ckey}&limit={lmt}")

    if r.status_code == 200:
        # Load the GIFs using the URLs for the smaller GIF sizes
        data = json.loads(r.content)
        gifs = data.get("results", [])

        for gif in gifs:
            gif_data = gif.get("gif")
            if gif_data and "url" in gif_data:
                gif_url = gif_data["url"]
                gif_urls.append(gif_url)
    else:
        print(f"Error in API request for keyword '{keyword}': {r.status_code}")

# Save the GIFs to the 'gifs' folder
for i, gif_url in enumerate(gif_urls):
    response = requests.get(gif_url, stream=True)
    if response.status_code == 200:
        with open(f'Generation/gifs/gif_{i}.gif', 'wb') as out_file:
            response.raw.decode_content = True
            shutil.copyfileobj(response.raw, out_file)
    else:
        print(f"Error downloading GIF {i}: {response.status_code}")

print("GIF retrieval and saving complete.")
