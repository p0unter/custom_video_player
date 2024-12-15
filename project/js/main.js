const video = document.querySelector(".video-source");
const video_range = document.querySelector(".video-range");
const video_volume_range = document.querySelector(".video-volume-range");

const video_currenttime = document.querySelector(".video-now-time");
const video_duration = document.querySelector(".video-time");

const video_play_button = document.querySelector("#video-play-button");
const video_volume_button = document.querySelector(".video-volume-button");

const video_volume_info = document.querySelector(".volume-inclusive .info");

let isPlay = false;

// Initialize video UI values
function initializeVideoUI() {
    updateCurrentTime(); // Set initial current time and duration
    setInitialVolume(); // Set initial volume based on volume range
    updateVolumeIcon(); // Set initial volume display
}

// Function to handle no video case
function handleNoVideo() {
    console.log("Video not found or not loaded.");
    const popup = document.querySelector(".video-popup-inclusive");
    const popup_content = popup.querySelector(".popup-content");
    popup_content.innerHTML = `
        <h2 class="popup-title"><img src="icons/error-warning-fill.svg" width="20">Video not found or not loaded.</h3>
        <div class="popup-main">
            If you think the problem is related to the video player: Contact me using the contact links in <a href="https://github.com/p0unter" style="color: aqua; cursor: pointer !important;">my Github account</a>.
        </div>
    `;
}

// Set initial volume based on volume range
function setInitialVolume() {
    const initialVolume = video_volume_range.value / 100; // Get value from range
    setVolume(initialVolume); // Set the initial volume
}

// Video control function
function videoController() {
    if (!isPlay) {
        video.play();
        isPlay = true;
        video_play_button.querySelector("img").src = "icons/pause-fill.svg";
        video_play_button.querySelector(".info").innerHTML = `Pause<b>(k)</b>`;
    } else {
        video.pause();
        isPlay = false;
        video_play_button.querySelector("img").src = "icons/play-fill.svg";
        video_play_button.querySelector(".info").innerHTML = `Play<b>(k)</b>`;
    }
}

// Update the current time and total duration in the user interface
function updateCurrentTime() {
    if (video && video.duration) {
        video_currenttime.textContent = formatTime(video.currentTime);
        video_duration.textContent = formatTime(video.duration);
        video_range.value = (video.currentTime / video.duration) * 100; // Update the range value
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function getCurrentTime() {
    return video ? video.currentTime : 0;
}

function setCurrentTime(set_value) {
    if (video && set_value >= 0 && set_value <= video.duration) {
        video.currentTime = set_value;
    } else {
        console.log(`Max Duration: ${video.duration}`);
    }
}

function getVolume() {
    return video ? video.volume : 0;
}

function setVolume(set_value) {
    if (video && set_value >= 0 && set_value <= 1) {
        video.volume = set_value;
        video_volume_range.value = set_value * 100; // Update the volume level
    } else {
        console.log("Max 1 / Min 0");
    }
}

// Update volume icon and volume display
function updateVolumeIcon() {
    const volumeLevel = Math.round(getVolume() * 100); // Convert to percentage and round
    video_volume_info.innerHTML = `Volume <b>(${volumeLevel})</b>`; // Display whole number

    const volumeIcon = video_volume_button.querySelector("img");
    if (volumeLevel > 50) {
        volumeIcon.src = "icons/volume-up-fill.svg";
    } else if (volumeLevel > 0) {
        volumeIcon.src = "icons/volume-down-fill.svg";
    } else {
        volumeIcon.src = "icons/volume-mute-fill.svg";
    }
}

function volumeMuted() {
    if (video) {
        video.muted = !video.muted;
        video_volume_range.value = video.muted ? 0 : video.volume * 100; // Update the muted status

        const volumeIcon = video_volume_button.querySelector("img");
        if (video.muted) {
            volumeIcon.src = "icons/volume-mute-fill.svg";
            video_volume_button.querySelector(".info").innerHTML = `Unmute<b>(m)</b>`;
        } else {
            volumeIcon.src = "icons/volume-down-fill.svg";
            video_volume_button.querySelector(".info").innerHTML = `Mute<b>(m)</b>`;
        }
    }
}

// Event listeners
video.addEventListener('loadedmetadata', initializeVideoUI); // Initialize values when metadata is loaded
video.addEventListener('timeupdate', updateCurrentTime); // Call the function when the time is updated
video_volume_range.addEventListener('input', (e) => {
    setVolume(e.target.value / 100); // Adjust the volume level
    updateVolumeIcon(); // Update the icon after changing volume
});
video_range.addEventListener('input', (e) => {
    setCurrentTime((e.target.value / 100) * video.duration); // Set the current time based on range changes
});

// Check if video source is available initially
window.addEventListener('load', () => {
    if (video || video.src) {
        handleNoVideo(); // Call the function if no video is found
    }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
        case 'k':
            e.preventDefault(); // Prevent scrolling when space is pressed
            videoController(); // Toggle play/pause
            break;
        case 'm':
            volumeMuted(); // Toggle mute/unmute
            break;
    }
});

const imageFollow = document.querySelector('.image-follow');

document.addEventListener('mousemove', (e) => {
    // Mouse imlecinin konumunu al
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Resmi mouse imlecinin konumuna yerleştir
    imageFollow.style.left = `${mouseX}px`;
    imageFollow.style.top = `${mouseY}px`;
});