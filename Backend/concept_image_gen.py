import openai
import subprocess
import requests
import shutil
import concurrent.futures

openai.api_key = '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'

def image_gen():
    with open('../Generation/data/audio.txt', 'r') as f:
        script = f.read()
        
    prompt = f"Based on this video script extract possible images that can be created for a video explaining this concept. Images should be a placeholder for that sentence. Give them in a comma-separated format. There should not be anything else in the output: {script}"

    chat_completion = openai.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4",
    )

    with open('../Generation/data/img_keyword.txt', 'w') as f:
        f.write(chat_completion.choices[0].message.content)


    # Read keywords from the text file


def fetch_image(keyword, image_count):
    response = openai.images.generate(
        model="dall-e-3",
        prompt=keyword,
        size="1792x1024",
        quality="hd",
        n=1,
    )

    image_url = response.data[0].url
    response = requests.get(image_url, stream=True)
    if response.status_code == 200:
        with open(f'../Generation/images/image_{str(image_count).zfill(2)}.jpg', 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        print(f'Image {image_count} successfully Downloaded')

# Fetch images one by one
image_gen()

with concurrent.futures.ThreadPoolExecutor() as executor:
    with open('../Generation/data/img_keyword.txt', 'r') as file:
        keywords = file.read().split(',')
        print(keywords)
    for i, keyword in enumerate(keywords, start=1):
        executor.submit(fetch_image, keyword, i)
        
        
subprocess.call(["python3", "tts.py"])