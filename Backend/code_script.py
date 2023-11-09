import openai
import subprocess

model_id = "gpt-3.5-turbo"
openai.api_key = "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"


def index():
    # print("Please enter the code: ")
    # code = input()
    # with open('code_input.txt', 'w') as f:
    #     f.write(code)    
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
    # subprocess.call(["python", "gif_gen.py"])

def code_sep():
    #save audio.txt into a string
    #save audio.txt into a string
    with open("audio.txt", "r") as f:
        audio = f.read()   
    with open('code_input.txt', 'r') as f:
        code = f.read()

    summary_prompt = f"Separate this code {code} into smaller segments to explain them easily based on the generated audio script {audio}. Give me the separate code in this format: Code1.txt :<code>, Code2.txt:<code>, ..... Avoid starting with - Sure, ..... Start directly - Code1: ....."
    
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": summary_prompt}
        ]
    )

    with open("code.txt", "w") as f:
        f.write(response['choices'][0]['message']['content'])

    print("File: audio.txt")
    subprocess.call(["python", "gif_gen.py"])
    


    
index()
code_sep()
