import os
import requests
from bs4 import BeautifulSoup
from googlesearch import search

def get_images_from_google_search(query, num_images=5):
    search_url = list(search(query + " images", num_results=1))[0]
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
    }
    
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all image tags
    img_tags = soup.find_all("img")
    
    # Extract URLs from the 'src' attribute
    img_urls = [img['src'] for img in img_tags if 'src' in img.attrs and img['src'].startswith('http') and any(ext in img['src'] for ext in ['.jpg', '.jpeg', '.png'])]
    
    # Return first num_images URLs
    return img_urls[:num_images]

def download_image(url, save_path):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
    }
    response = requests.get(url, headers=headers, stream=True)
    response.raise_for_status()
    with open(save_path, 'wb') as file:
        for chunk in response.iter_content(8192):
            file.write(chunk)

if __name__ == "__main__":
    term = input("Enter the search term: ")
    images = get_images_from_google_search(term)
    for i, img_url in enumerate(images, 1):
        save_path = os.path.join("..", "Generation", "images", f"downloaded_image_{i}.jpg")
        download_image(img_url, save_path)
        print(f"Image {i} saved to: {save_path}")
