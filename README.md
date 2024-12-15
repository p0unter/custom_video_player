# Video Player Project

A simple, responsive video player built with HTML, CSS, and JavaScript. This project allows users to play, pause, control volume, and navigate through videos using custom buttons and features. It is designed to be lightweight and easy to use with a focus on performance and user experience.

## Features

- Play, pause, and mute the video
- Volume control with a slider
- Fullscreen toggle
- Video progress bar with playback controls
- Custom control buttons (Play, Pause, Mute, Volume Slider, Fullscreen)
- Responsive design for various screen sizes

## Installation

To use this video player on your website or project:

1. Clone this repository or download the files.
    ```bash
    git clone https://github.com/p0unter/video-player.git
    ```

2. Open the `index.html` file in your browser to see the video player in action.

## Usage

Simply open the `index.html` file in any modern web browser. The player provides basic controls such as play/pause, volume control, and fullscreen toggle.

To add a video, replace the `src` attribute of the `<video>` tag with the path to your video file:

```html
<video id="myVideo" width="600" controls>
  <source src="your-video-file.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
