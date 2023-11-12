from openai import OpenAI
import subprocess

client = OpenAI(api_key="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")

def index():
    with open('../Generation/data/audio.txt', 'r') as f:
        content = f.read()

    print("Fetching GIFs...")
    summary_prompt = f"Create only 10 gif keywords or phrase that have expression from this audio script. Give me just the keywords one by one without any numbering or text before it and no quotes just plain text: {content}"
    
    response = client.chat.completions.create(
      messages=[
            {"role": "user", "content": summary_prompt}
        ],
      model="gpt-4",
    )

    with open("../Generation/data/gif_keyword.txt", "w") as f:
        f.write(response.choices[0].message.content)

    subprocess.call(["python3", "tenor.py"])
    
index()
