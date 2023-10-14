from moviepy.editor import VideoFileClip, ImageSequenceClip, concatenate_videoclips, AudioFileClip
import os
import numpy as np


   
   
# Define the paths to the image and GIF folders and the audio file
image_folder = "images/"
gif_folder = "gifs/"
audio_file = "leapyear.mp3"

# Get the list of image and GIF files
image_files = sorted([os.path.join(image_folder, file) for file in os.listdir(image_folder) if file.startswith("img")])
gif_files = sorted([os.path.join(gif_folder, file) for file in os.listdir(gif_folder) if file.startswith("gif")])

# Calculate the total duration of the audio
audio_clip = AudioFileClip(audio_file)
total_duration = audio_clip.duration

# Calculate the target duration for each image and GIF
num_gifs = len(gif_files)
num_images = len(image_files)
total_clips = num_gifs + num_images
clip_duration = total_duration / total_clips

# Create video clips from the GIFs and images
gif_clips = [VideoFileClip(gif_file, audio=False).loop() for gif_file in gif_files]
image_clips = [ImageSequenceClip([image_file], fps=24) for image_file in image_files]

# Initialize variables to keep track of the current position in the clips
current_gif = 0
current_image = 0

# Create a list to hold the final clips
final_clips = []

# Distribute the clips equally for the audio duration
current_time = 0
while current_gif < num_gifs or current_image < num_images:
    if current_gif < num_gifs:
        gif_clip = gif_clips[current_gif].subclip(0, clip_duration)
        final_clips.append(gif_clip)
        current_gif += 1
        current_time += clip_duration
    if current_image < num_images:
        image_clip = image_clips[current_image].subclip(0, clip_duration)
        final_clips.append(image_clip)
        current_image += 1
        current_time += clip_duration

# Concatenate the clips
final_video = concatenate_videoclips(final_clips, method="compose")

# Set the audio of the final video
final_video = final_video.set_audio(audio_clip)

# Export the final video
final_video.write_videofile("output_video.mp4", codec="libx264", audio_codec="aac")
