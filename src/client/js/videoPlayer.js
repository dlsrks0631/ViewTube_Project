const video = document.querySelector("video");

const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");

const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");

const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5; // 유저한테 기본값으로 설정한 볼륨
video.volume = volumeValue;

//// 비디오 실행-정지 ////
const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

//// Space bar를 통한 비디오 실행 정지 ////
const handleSpaceBarClick = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

//// 화면 터치를 통한 비디오 실행 정지 ////
const handlePlayByTouch = () => {
  handlePlayClick();
};

//// 음소거 ////
const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue; // 볼륨 조절
};

//// 시간 변환 00:00:00 ////
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

//// 소리 크기 ////
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event; // == event.target.value
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "mute";
  }
  volumeValue = value; // 전역변수
  video.volume = value; // 비디오 볼륨 바뀌게함
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

//// 타임라인 ////
// 비디오 시간이 바뀔 시 타임라인 또한 비디오 시간에 맞춰 변경됨
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

// 타임라인 조절 시 해당 비디오의 currentTime도 그에 맞게 변경됨
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

// 전체화면 조절
const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

// 사라짐 함수
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  } // 오래된 timeout 취소
  videoControls.classList.add("showing");

  // 사용자가 마우스를 멈출 때 취소할 수 없는 새로운 timeout 생성
  // -> timeout은 마우스를 움직일 때만 취소되므로
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000); // 3초 뒤에 hideControls
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

//// 비디오 실행/정지 ////
playBtn.addEventListener("click", handlePlayClick);
videoContainer.addEventListener("click", handlePlayByTouch);
document.addEventListener("keydown", handleSpaceBarClick);

muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange); // input => 클릭하고 이동할때 반응
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);

video.addEventListener("ended", handleEnded);

timeline.addEventListener("input", handleTimelineChange);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
fullScreenBtn.addEventListener("click", handleFullScreen);
