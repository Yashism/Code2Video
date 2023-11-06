import openai
import subprocess

model_id = "gpt-3.5-turbo"
openai.api_key = "<Key>"

def index():
    with open('audio.txt', 'r') as f:
        content = f.read()

    print("Fetching GIFs...")
    summary_prompt = f"Create 10 gif keywords or phrase that have expression from this audio script. Give me just the keywords one by one without any numbering or text before it: {content}"
    
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": summary_prompt}
        ]
    )

    with open("gif_keyword.txt", "w") as f:
        f.write(response['choices'][0]['message']['content'])

    subprocess.call(["python3", "tenor.py"])
    
index()
