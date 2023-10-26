import openai
import subprocess

model_id = "gpt-3.5-turbo"
openai.api_key = "<Key>"


def index():
    print("Please enter the concept: ")
    concept = input()
    with open('concept_input.txt', 'w') as f:
        f.write(concept)    
    with open('concept_input.txt', 'r') as f:
        content = f.read()
    print("Generating script...")
    summary_prompt = f"Write a audio script explainaing the concept of {content}. Explan it like a 5 year old. Explain it in detail. Everything in 1 paragraph. Max 250 words.  Start with the script. No text before it. Avoid starting with - Sure, ..... Start directly - <concept>....."
    
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": summary_prompt}
        ]
    )

    with open("audio.txt", "w") as f:
        f.write(response['choices'][0]['message']['content'])

    subprocess.call(["python3", "gif_gen.py"])
    
index()
