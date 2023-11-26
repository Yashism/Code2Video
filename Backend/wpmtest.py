from pydub import AudioSegment
import re

def measure_audio_duration_mp3(file_path):
    """Measure the duration of an MP3 audio file."""
    audio = AudioSegment.from_mp3(file_path)
    duration_seconds = len(audio) / 1000.0
    return duration_seconds

def calculate_wpm(text, duration):
    """Calculate words per minute."""
    word_count = len(text.split())
    return word_count / duration * 60

def seconds_to_srt_time(seconds):
    """Convert seconds to SRT time format."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = seconds % 60
    return f"{hours:02}:{minutes:02}:{seconds:06.3f}".replace('.', ',')

def text_to_srt(text, wpm):
    """Convert text to SRT format using the given WPM for timing."""
    parts = [p.strip() for p in re.split(r'[.,]', text) if p]
    start_time = 0
    srt_entries = []

    for i, part in enumerate(parts):
        words = part.split()
        duration = len(words) / wpm * 60  # Duration in seconds
        end_time = start_time + duration

        start_time_str = seconds_to_srt_time(start_time)
        end_time_str = seconds_to_srt_time(end_time)

        srt_entries.append(f"{i+1}\n{start_time_str} --> {end_time_str}\n{part}\n\n")

        start_time = end_time

    return srt_entries

# Replace these paths with your actual file paths
audio_file_path = '../Generation/audio/output.mp3'
text_file_path = '../Generation/data/audio.txt'

# Measure the duration of the audio file and calculate WPM
audio_duration = measure_audio_duration_mp3(audio_file_path)
with open(text_file_path, 'r') as file:
    text_content = file.read()
wpm = calculate_wpm(text_content, audio_duration)

# Print the results
print(f"The audio duration is: {audio_duration}")
print(f"The estimated Words Per Minute (WPM) is: {wpm}")

# Generate SRT data and write to a file
srt_data = text_to_srt(text_content, wpm)
srt_file_path = '../Generation/data/generated_subtitles.srt'
with open(srt_file_path, 'w') as file:
    file.writelines(srt_data)

print("SRT file created successfully.")
