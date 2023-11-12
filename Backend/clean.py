import os
import glob

# Define the directory
data_dir = '../Generation/data'

# Define the file type to clear
file_type = '*.txt'

# Clear all text files in the data directory
files = glob.glob(os.path.join(data_dir, file_type))
for file in files:
    try:
        open(file, 'w').close()
        print(f"File {file} has been cleared.")
    except Exception as e:
        print(f"Error occurred while clearing file {file}. Error: {str(e)}")