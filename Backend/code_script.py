import openai
import subprocess

model_id = "gpt-3.5-turbo"
openai.api_key = "<Key>"


def index():
    print("Please enter the code: ")
    code = input()
    with open('code_input.txt', 'w') as f:
        f.write(code)    
    with open('code_input.txt', 'r') as f:
        content = f.read()

    summary_prompt = f"Write a audio script explaining the code: {content}. Explan it like a 5 year old. Explain it in detail. Everything in 1 paragraph. Max 100 words. Start with the script. No text before it. Avoid starting with - Sure, ..... Start directly - In this code....."
    
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": summary_prompt}
        ]
    )

    with open("audio.txt", "w") as f:
        f.write(response['choices'][0]['message']['content'])

    print("File: audio.txt")
    subprocess.call(["python", "gif_gen.py"])
    
index()
