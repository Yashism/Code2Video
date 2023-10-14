import subprocess

print("Hey, this is Code2Video. Our code-to-video conversion provides an alternative method for learners to grasp coding concepts.")

choice = input("Do you want to enter a code or a concept? (Enter 'code' or 'concept'): ")

if choice.lower() == 'code':
   subprocess.call(["python3", "code_script.py"])
elif choice.lower() == 'concept':
   subprocess.call(["python3", "concept_script.py"])
   
print("All resources saved...")