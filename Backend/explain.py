from moviepy.editor import VideoFileClip, ImageSequenceClip, concatenate_videoclips, AudioFileClip
import os
import subprocess
# Define the paths to the image and GIF folders and the audio file
image_folder = "../Generation/images/"
gif_folder = "../Generation/gifs/"
audio_file = "../Generation/audio/output.mp3"

# Get the list of image and GIF files
image_files = sorted([os.path.join(image_folder, file) for file in os.listdir(image_folder)])
gif_files = sorted([os.path.join(gif_folder, file) for file in os.listdir(gif_folder)])

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
image_clips = [ImageSequenceClip([image_file], fps=24, durations=[clip_duration]) for image_file in image_files]

# Create a list to hold the final clips
final_clips = []

# Loop to interleave GIFs and images
gif_index = 0
image_index = 0

while gif_index < num_gifs or image_index < num_images:
    if gif_index < num_gifs:
        final_clips.append(gif_clips[gif_index].subclip(0, clip_duration))
        gif_index += 1
    if image_index < num_images:
        final_clips.append(image_clips[image_index].subclip(0, clip_duration))
        image_index += 1

# Concatenate the clips
final_video = concatenate_videoclips(final_clips, method="compose")

# Set the audio of the final video
final_video = final_video.set_audio(audio_clip)

# Export the final video
final_video.write_videofile("../Generation/videos/output_video.mp4", codec="libx264", audio_codec="aac")

