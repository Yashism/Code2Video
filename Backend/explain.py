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

gif_clips = [VideoFileClip(gif_file, audio=False).loop().set_duration(clip_duration) for gif_file in gif_files]
image_clips = [ImageSequenceClip([image_file], fps=24, durations=[clip_duration]) for image_file in image_files]


# Create a list to hold the final clips
final_clips = []

# Loop to interleave GIFs and images
gif_index = 0
image_index = 0

while gif_index < num_gifs or image_index < num_images:
    if gif_index < num_gifs:
        gif_clip = gif_clips[gif_index].subclip(0, clip_duration)
        if gif_clip.duration is None:
            gif_clip = gif_clip.set_duration(clip_duration)
        final_clips.append(gif_clip)
        gif_index += 1
    if image_index < num_images:
        image_clip = image_clips[image_index].subclip(0, clip_duration)
        if image_clip.duration is None:
            image_clip = image_clip.set_duration(clip_duration)
        final_clips.append(image_clip)
        image_index += 1

# Concatenate the clips
final_video = concatenate_videoclips(final_clips, method="compose")

# Set the fps for the final video explicitly if not set
if not hasattr(final_video, 'fps') or final_video.fps is None:
    final_video.fps = 24  # Set to a default value like 24 fps

# Set the audio of the final video
final_video = final_video.set_audio(audio_clip)

# save and export the video
final_video.write_videofile("../Frontend/c2v/src/videos/output_video.mp4", codec="libx264", audio_codec="aac", fps=final_video.fps)

# use ffmpeg to add subtitles
subprocess.call(['ffmpeg', '-i', '../Frontend/c2v/src/videos/output_video.mp4', '-vf', 'subtitles=../Generation/data/generated_subtitles.srt', '../Frontend/c2v/src/videos/output_video_subtitled.mp4'])

# delete the original video
os.remove("../Frontend/c2v/src/videos/output_video.mp4")

# rename the subtitled video
os.rename("../Frontend/c2v/src/videos/output_video_subtitled.mp4", "../Frontend/c2v/src/videos/output_video.mp4")

# print when done
print("Video saved as 'output_video.mp4'.")
