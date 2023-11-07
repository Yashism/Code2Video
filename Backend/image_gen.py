import requests
import re

# Extract code snippets from code.txt
code_snippets = {}
with open("code.txt", "r") as file:
    content = file.read()
    matches = re.findall(r"(Code\d+.txt):\n```python\n(.*?)\n```", content, re.DOTALL)
    for match in matches:
        code_snippets[match[0]] = match[1].strip()

# Generate image for each code snippet
url = "https://carbonara.solopov.dev/api/cook"
headers = {'Content-Type': 'application/json'}

for file_name, code in code_snippets.items():
    payload = {
        "code": code,
        "backgroundColor": "#7367F0"  # You can modify other parameters here
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        with open(f"../Generation/images/{file_name}.png", "wb") as img_file:
            img_file.write(response.content)
        print(f"Generated {file_name}.png")
    else:
        print(f"Failed to generate image for {file_name}", response.status_code)


