(function() {
"use strict";

var bodyArea = document.querySelector("body");
var header = document.querySelector("#mainHeader");
var hambMenu = header.querySelector("#hamburgerMenu > button");
var nav = header.querySelector("#mainNav");
var menuBtn = nav.querySelectorAll("a");
var bannerImg = document.querySelectorAll(".bannerImg");
var mainLogo = document.querySelector("#mainLogo");
var bannerCnt = document.querySelector("#bannerContent");
var dvdCover = bannerCnt.querySelector("#dvdCover");
var text = bannerCnt.querySelectorAll("p");
var movieDiv = document.querySelector("#movie");
var videosDiv = document.querySelector("#videos");
var photosDiv = document.querySelector("#photos");
var registerDiv = document.querySelector("#register");
var charRow = document.querySelectorAll(".charRow");
var moreChars = document.querySelector("#moreChars");
var menuOpen = false;
var teaser = document.querySelector("#teaser");
var trailer = document.querySelector("#trailer");
var videoControl = document.querySelectorAll(".controls");
var overVideo = document.querySelectorAll(".overVideo");
var videoBtn = document.querySelectorAll(".videoBtn");
var playBtn = document.querySelectorAll(".playBtn");
var seekBar = document.querySelectorAll(".seekBar");
var volumeBtn = document.querySelectorAll(".volumeBtn");
var volumeBar = document.querySelectorAll(".volumeBar");
var fullBtn = document.querySelectorAll(".fullBtn");
var photos = document.querySelectorAll(".galleryPhoto");
var leftArrow = document.querySelector("#galleryLeft");
var rightArrow = document.querySelector("#galleryRight");
var curPhoto = 0;
var photoSize = 1366;
var thumbnails = document.querySelectorAll(".galleryThumb");
var socialIcon = document.querySelectorAll(".socialIcon");

var headerTl = new TimelineLite({
  paused: true
});
var bannerTl = new TimelineMax({
  repeat: -1
});
var teaserCtrlTl = new TimelineLite({
  paused: true
});
var trailerCtrlTl = new TimelineLite({
  paused: true
});
var galleryTl = new TimelineLite();

// funcion to animate header banner
function changeBanner() {
  bannerTl.to(mainLogo, 2, {opacity: 1}, "+=2.0");
  bannerTl.to(bannerCnt, 2, {opacity: 1}, "-=1.0");
  bannerTl.to(bannerCnt, 2, {opacity: 0}, "+=4.0");
  bannerTl.to(mainLogo, 2, {opacity: 0}, "-=1.0");
  bannerTl.to(bannerImg[1], 2, {opacity: 1});
  bannerTl.to(mainLogo, 2, {opacity: 1}, "+=2.0");
  bannerTl.to(bannerCnt, 2, {opacity: 1}, "-=1.0");
  bannerTl.to(bannerCnt, 2, {opacity: 0}, "+=4.0");
  bannerTl.to(mainLogo, 2, {opacity: 0}, "-=1.0");
  bannerTl.to(bannerImg[2], 2, {opacity: 1});
  bannerTl.to(bannerImg[1], 0.1, {opacity: 0}, "-=0.1");
  bannerTl.to(mainLogo, 2, {opacity: 1}, "+=2.0");
  bannerTl.to(bannerCnt, 2, {opacity: 1}, "-=1.0");
  bannerTl.to(bannerCnt, 2, {opacity: 0}, "+=4.0");
  bannerTl.to(mainLogo, 2, {opacity: 0}, "-=1.0");
  bannerTl.to(bannerImg[3], 2, {opacity: 1});
  bannerTl.to(bannerImg[2], 0.1, {opacity: 0}, "-=0.1");
  bannerTl.to(mainLogo, 2, {opacity: 1}, "+=2.0");
  bannerTl.to(bannerCnt, 2, {opacity: 1}, "-=1.0");
  bannerTl.to(bannerCnt, 2, {opacity: 0}, "+=4.0");
  bannerTl.to(mainLogo, 2, {opacity: 0}, "-=1.0");
  bannerTl.to(bannerImg[4], 2, {opacity: 1});
  bannerTl.to(bannerImg[3], 0.1, {opacity: 0}, "-=0.1");
  bannerTl.to(mainLogo, 2, {opacity: 1}, "+=2.0");
  bannerTl.to(bannerCnt, 2, {opacity: 1}, "-=1.0");
  bannerTl.to(bannerCnt, 2, {opacity: 0}, "+=4.0");
  bannerTl.to(mainLogo, 2, {opacity: 0}, "-=1.0");
  bannerTl.to(bannerImg[4], 2, {opacity: 0});
}

function checkScroll() {
  // if menu is open, close it when scroll
  if(menuOpen === true) {
    menuAnimation();
  }
}

// function to play opening/closing animation
function menuAnimation() {
  if (!menuOpen) {
    menuOpen = true;
    headerTl.play();
  }
  else {
    menuOpen = false;
    headerTl.reverse();
  }
}

// timeline to expand header height and show menu nav in mobile/tablet versions when hamburger menu is clicked
function openMenu() {
  var totalHeight = 0;
  if (window.innerWidth < 640) {
    totalHeight = "14.5rem";
  }
  else {
    totalHeight = "15.5rem";
  }

  headerTl.to(header, 1, {height: totalHeight, ease: Power3.easeOut});
  headerTl.to(nav, 1, {opacity: 1, right: "0.1rem"}, "-=0.7");
}

// function to hide video control just when video is played
// necessary to mobile version because there is no cursor over/out to check if control must be shown or hidden
function mobileVideoControl(el) {
  if (el.classList.contains("teaserEl")) {
    teaserCtrlTl.play();
  }
  else {
    trailerCtrlTl.play();
  }
}

// function to check which video control must be hidden when video is playing and cursor is not over the video
// plays timeline to hide video control
function outVideoControl(evt) {
  var video = checkVideo(evt.currentTarget);
  if (video.id === "teaser") {
    teaserCtrlTl.play();
  }
  else {
    trailerCtrlTl.play();
  }
}

// function to check which video control must be shown when video is playing and cursor is over the video
// plays timeline in reverse to show video control
function overVideoControl(evt) {
  var video = checkVideo(evt.currentTarget);
  if (video.id === "teaser") {
    teaserCtrlTl.reverse();
  }
  else {
    trailerCtrlTl.reverse();
  }
}

// timelines to hide video control when video is playing and mouse is not over the video
function hideVideoControl() {
  teaserCtrlTl.to(videoControl[0], 1, {opacity: 0});
  trailerCtrlTl.to(videoControl[1], 1, {opacity: 0});
}

// function to display extra character sections when clicked
// each interaction shows an extra section
// when all sections are being shown, changes option to hide extra sections, showing only original one(s)
function displayChars() {
  var displayed = false;
  // check if show less is being displayed
  if (moreChars.innerHTML === "Show Less") {
    for (var i = 0; i < charRow.length; i++) {
      charRow[i].style.display = null;
      moreChars.innerHTML = "More Characters";
    }
  }
  else {
    // display the first hidden section
    for (var i = 0; i < charRow.length; i++) {
      if (charRow[i].offsetHeight === 0) {
        // test if displayed already in the iteration
        if(!displayed) {
          charRow[i].style.display = "block";
          displayed = true;
          // when displays the last extra section, changes button
          if (i === charRow.length - 1) {
            moreChars.innerHTML = "Show Less";
          }
        }
      }
    }
  }
}

// function to check which video to take some action regarding clicked button
function checkVideo(el) {
  var video = 0;
  if (el.classList.contains("teaserEl")) {
    video = teaser;
  }
  else {
    video = trailer;
  }
  return video;
}

// function to check which play video area element must be accessed regarding clicked element
function checkOverVideo(el) {
  var overDiv = 0;
  var overBtn = 0;
  if (el.classList.contains("teaserEl")) {
    overDiv = overVideo[0];
    overBtn = videoBtn[0];
  }
  else {
    overDiv = overVideo[1];
    overBtn = videoBtn[1];
  }
  return {over: overDiv, btn: overBtn} ;
}

// function to check which play button must be accessed regarding clicked element
function checkPlayButton(el) {
  var button = 0;
  if (el.classList.contains("teaserEl")) {
    button = playBtn[0];
  }
  else {
    button = playBtn[1];
  }
  return button;
}

// function to check whick video control must be accessed regarding clicked element
function checkVideoControl(el) {
  var control = 0;
  if (el.classList.contains("teaserEl")) {
    control = videoControl[0];
  }
  else {
    control = videoControl[1];
  }
  return control;
}

// function to play/pause video by clicking Play button
function togglePlayBtn(evt) {
  var video = checkVideo(evt.currentTarget);
  var control = checkVideoControl(evt.currentTarget);
  var overArea = checkOverVideo(evt.currentTarget);
  var over = overArea.over;
  var btn = overArea.btn;
  if(video.paused) {
    over.style.backgroundColor = "transparent";
    video.play();
    evt.currentTarget.src = "images/button_pause_dark.png"
    btn.style.display = "none";

    over.addEventListener("mouseout", outVideoControl, false);
    over.addEventListener("mouseover", overVideoControl, false);
    control.addEventListener("mouseout", outVideoControl, false);
    control.addEventListener("mouseover", overVideoControl, false);

    mobileVideoControl(over);
  }
  else {
    video.pause();
    evt.currentTarget.src = "images/button_play_dark.png"
    btn.style.display = "block";

    over.removeEventListener("mouseout", outVideoControl, false);
    over.removeEventListener("mouseover", overVideoControl, false);
    control.removeEventListener("mouseout", outVideoControl, false);
    control.removeEventListener("mouseover", overVideoControl, false);
  }
}

// function to play/pause video by clicking on the video element
function togglePlayVideo(evt) {
  var control = checkVideoControl(evt.currentTarget);
  var overArea = checkOverVideo(evt.currentTarget);
  var over = overArea.over
  var video = 0;
  var button = 0;
  var vidBtn = 0;
  if (evt.currentTarget.id === "teaser") {
    video = teaser;
    button = playBtn[0];
    vidBtn = videoBtn[0];
  }
  else {
    video = trailer;
    button = playBtn[1];
    vidBtn = videoBtn[1];
  }
  if(video.paused) {
    video.play();
    button.src = "images/button_pause_dark.png"
    vidBtn.style.display = "none";

    over.addEventListener("mouseout", outVideoControl, false);
    over.addEventListener("mouseover", overVideoControl, false);
    control.addEventListener("mouseout", outVideoControl, false);
    control.addEventListener("mouseover", overVideoControl, false);

    mobileVideoControl(over);
  }
  else {
    video.pause();
    button.src = "images/button_play_dark.png"
    vidBtn.style.display = "block";

    over.removeEventListener("mouseout", outVideoControl, false);
    over.removeEventListener("mouseover", overVideoControl, false);
    control.removeEventListener("mouseout", outVideoControl, false);
    control.removeEventListener("mouseover", overVideoControl, false);
  }
}

// function to play/pause video when clicking on play button over video area
function togglePlayOver(evt) {
  var video = checkVideo(evt.currentTarget);
  var play = checkPlayButton(evt.currentTarget);
  var control = checkVideoControl(evt.currentTarget);
  var overArea = checkOverVideo(evt.currentTarget);
  var over = overArea.over;
  var btn = overArea.btn;
  if(video.paused) {
    video.play();
    over.style.backgroundColor = "transparent";
    btn.style.display = "none";
    play.src = "images/button_pause_light.png"

    over.addEventListener("mouseout", outVideoControl, false);
    over.addEventListener("mouseover", overVideoControl, false);
    control.addEventListener("mouseout", outVideoControl, false);
    control.addEventListener("mouseover", overVideoControl, false);

    mobileVideoControl(over);
  }
  else {
    video.pause();
    btn.style.display = "block";
    play.src = "images/button_play_light.png"

    over.removeEventListener("mouseout", outVideoControl, false);
    over.removeEventListener("mouseover", overVideoControl, false);
    control.removeEventListener("mouseout", outVideoControl, false);
    control.removeEventListener("mouseover", overVideoControl, false);
  }
}

// function to move video forward or backward regarding seek bar position
function moveVideo(evt) {
  var video = checkVideo(evt.currentTarget);
  var seek = evt.currentTarget;
  var time = video.duration * (seek.value / 100);

  video.currentTime = time;
}

// function to check which seek bar to move when video is playing
function checkSeekBar(el) {
  var seek = 0;
  if (el.id === "teaser") {
    seek = seekBar[0];
  }
  else {
    seek = seekBar[1];
  }
  return seek;
}

// function to slide seek bar while video is playing
function slideProgress(evt) {
  var video = evt.currentTarget;
  var seek = checkSeekBar(video);
  var value = (100 / video.duration) * video.currentTime;

  seek.value = value;
}

// function to pause video while sliding seek bar
function seekPause(evt) {
  var video = checkVideo(evt.currentTarget);
  video.pause();
}

// function to play video when seek bar is released
function seekPlay(evt) {
  var video = checkVideo(evt.currentTarget);
  video.play();
}

// function to mute video by clicking Mute button
function muteVideo(evt) {
  var video = checkVideo(evt.currentTarget);

  if (video.muted == false) {
    video.muted = true;
    evt.currentTarget.src = "images/button_mute_dark.png"
  } else {
    video.muted = false;
    evt.currentTarget.src = "images/button_volume_dark.png"
  }
}

// function to change volume regarding volume bar
function changeVolume(evt) {
  var video = checkVideo(evt.currentTarget);
  var volBar = evt.currentTarget;

  video.volume = volBar.value;
}

// function to present video on full screen
function fullScreen(evt) {
  var video = checkVideo(evt.currentTarget);
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

// function to change video control buttons on hover
function overButton(evt) {
  evt.currentTarget.src = evt.currentTarget.src.replace("light", "dark");
}

// function to change video control buttons to original one when cursor is out
function outButton(evt) {
  evt.currentTarget.src = evt.currentTarget.src.replace("dark", "light");
}

// function to check which volBar must be shown/hidden regarding volume button clicked
function checkVolBar(el) {
  var volBar = 0;
  if (el.classList.contains("teaserEl")) {
    volBar = volumeBar[0];
  }
  else {
    volBar = volumeBar[1];
  }
  return volBar;
}

// function to show volume bar when cursor is over volume button
function overVolButton(evt) {
  var volBar = checkVolBar(evt.currentTarget);
  evt.currentTarget.src = evt.currentTarget.src.replace("light", "dark");
  volBar.style.opacity = 1;
  volBar.style.cursor = "pointer";
}

function outVolBar(evt) {
  evt.currentTarget.style.opacity = 0;
  evt.currentTarget.style.cursor = null;
}

// function to scroll to selected area when menu clicked
// scrollIntoView options do not work on Safari (blame Apple, not me)
function scrollSection(evt) {
  evt.preventDefault();
  if (window.innerWidth < 1024) {
    menuAnimation();
  }
  if (evt.currentTarget.id == "menuHome") {
    bodyArea.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
  }
  else if (evt.currentTarget.id == "menuMovie") {
    movieDiv.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
  }
  else if (evt.currentTarget.id == "menuVideos") {
    videosDiv.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
  }
  else if (evt.currentTarget.id == "menuPhotos") {
    photosDiv.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
  }
  else {
    registerDiv.scrollIntoView({block: 'start', inline: 'start', behavior: "smooth"});
  }
}

// function to add event listener of current photo on gallery just after showing it on gallery
// necessary to make functions hideArrows() and showArrows() work properly
function addPhotoEvent(num) {
  photos[num].addEventListener("mouseover", showArrows, false);
  photos[num].addEventListener("mouseout", hideArrows, false);
}

// function to remove event listener of current photo on gallery before changing it for other
// necessary to make functions hideArrows() and showArrows() work properly
function removePhotoEvent(num) {
  photos[num].removeEventListener("mouseover", showArrows, false);
  photos[num].removeEventListener("mouseout", hideArrows, false);
}

// function to show previous photo of gallery when left arrow is clicked
function previousPhoto() {
  if(!galleryTl.isActive()) {
    if (curPhoto === 0) {
      removePhotoEvent(curPhoto);
      galleryTl.to(photos[0], 1, {left: "-"+photoSize+"px"});
      galleryTl.to(photos[photos.length-1], 1, {left: 0}, "-=0.9");
      curPhoto = photos.length-1;
      addPhotoEvent(curPhoto);
    }
    else {
      removePhotoEvent(curPhoto);
      galleryTl.to(photos[curPhoto-1], 0, {visibility: "hidden", left: "-"+photoSize+"px"});
      galleryTl.to(photos[curPhoto], 1, {left: photoSize+"px"});
      galleryTl.to(photos[curPhoto-1], 1, {visibility: "visible", left: 0}, "-=0.9");
      curPhoto = curPhoto - 1;
      addPhotoEvent(curPhoto);
    }
  }
}

// function to show next photo of gallery when right arrow is clicked
function nextPhoto() {
  if(!galleryTl.isActive()) {
    if (curPhoto === photos.length-1) {
      removePhotoEvent(curPhoto);
      galleryTl.to(photos[curPhoto], 1, {left: photoSize+"px"});
      galleryTl.to(photos[0], 1, {left: 0}, "-=0.9");
      curPhoto = 0;
      addPhotoEvent(curPhoto);
    }
    else {
      removePhotoEvent(curPhoto);
      galleryTl.to(photos[curPhoto+1], 0, {visibility: "hidden", left: photoSize+"px"});
      galleryTl.to(photos[curPhoto], 1, {left: "-"+photoSize+"px"});
      galleryTl.to(photos[curPhoto+1], 1, {visibility: "visible", left: 0}, "-=0.9");
      curPhoto = curPhoto + 1;
      addPhotoEvent(curPhoto);
    }
  }
}

// function to hide photo gallery arrows when mouse is out of photo
function hideArrows() {
  TweenMax.to(leftArrow, 1, {opacity: 0});
  TweenMax.to(rightArrow, 1, {opacity: 0});
}

// function to show photo gallery arrows when mouse is on photo
function showArrows() {
  TweenMax.to(leftArrow, 1, {opacity: 1});
  TweenMax.to(rightArrow, 1, {opacity: 1});
}

// function to show photo selected on thumbnail
function showPhoto(evt) {
  // parse index of pressed thumbnail by its id number
  var index = parseInt(evt.currentTarget.id.replace("thumb", "")) - 1;
  if (curPhoto != index) {
    removePhotoEvent(curPhoto);
    if (curPhoto < index) {
      galleryTl.to(photos[index], 0, {visibility: "hidden", left: photoSize+"px"});
      galleryTl.to(photos[curPhoto], 1, {left: "-"+photoSize+"px"});
    }
    else {
      galleryTl.to(photos[index], 0, {visibility: "hidden", left: "-"+photoSize+"px"});
      galleryTl.to(photos[curPhoto], 1, {left: photoSize+"px"});
    }
    galleryTl.to(photos[index], 1, {visibility: "visible", left: 0}, "-=0.9");
    curPhoto = index;
    addPhotoEvent(curPhoto);
  }
}

// function to check orientation of device
function checkOrientation() {
  if (screen.orientation.angle === 90 || screen.orientation.angle === -90) {
    showLandscape();
  }
  else {
    showPortrait();
  }
}

// function to change banner content style if orientation is landscape and screen size is small or medium
function showLandscape() {
  if (window.innerWidth < 1024) {
    for (var i = 0; i < bannerImg.length; i++) {
      bannerImg[i].src = bannerImg[i].src.replace("portrait", "landscape");
    }
    mainLogo.style.width = "50%";
    mainLogo.style.top = "45%";
    mainLogo.style.left = "72.5%";
    bannerCnt.style.width = "45%";
    bannerCnt.style.height = "100%";
    bannerCnt.style.top = 0;
    bannerCnt.style.left = 0;
    dvdCover.style.float = "none";
    dvdCover.style.width = "45%";
    dvdCover.style.margin = "2rem 0 0 0";
    for (var i = 0; i < text.length; i++) {
      text[i].style.float = "none";
      text[i].style.margin = "2rem 0 0 0";
      text[i].style.fontSize = "1.125rem";
    }
  }
  if (window.innerWidth < 640) {
    mainLogo.style.top = "60%";
    dvdCover.style.width = "40%";
    dvdCover.style.margin = "0.5rem 0 0 0";
    for (var i = 0; i < text.length; i++) {
      text[i].style.margin = "0.5rem 0 0 0";
      text[i].style.fontSize = "1rem";
    }
    text[0].style.marginTop = "3.5rem";
  }
}

// function to change banner content style if orientation is portrait and screen size is small or medium
// as portrait is default orientation to these screen sizes, function resets properties
function showPortrait() {
  if (window.innerWidth < 1024) {
    for (var i = 0; i < bannerImg.length; i++) {
      bannerImg[i].src = bannerImg[i].src.replace("landscape", "portrait");
    }
  }
  mainLogo.style.width = null;
  mainLogo.style.top = null;
  mainLogo.style.left = null;
  bannerCnt.style.width = null;
  bannerCnt.style.height = null;
  bannerCnt.style.top = null;
  bannerCnt.style.left = null;
  dvdCover.style.float = null;
  dvdCover.style.width = null;
  dvdCover.style.margin = null;
  for (var i = 0; i < text.length; i++) {
    text[i].style.float = null;
    text[i].style.margin = null;
    text[i].style.fontSize = null;
  }
}

// function to reset header height on resize
function resetHeader() {
  header.style.height = null;
  nav.style.opacity = null;
  nav.style.right = null;
}

// function to change social icon file on hover
function iconOver(evt) {
  evt.preventDefault();
  evt.currentTarget.src = evt.currentTarget.src.replace("black", "orange");
}

// function to change social icon file to original one when mouse is out
function iconOut(evt) {
  evt.preventDefault();
  evt.currentTarget.src = evt.currentTarget.src.replace("orange", "black");
}

window.addEventListener("load", checkOrientation, false);
window.addEventListener("load", changeBanner, false);
window.addEventListener("orientationchange", checkOrientation, false);
window.addEventListener("load", openMenu, false);
window.addEventListener("load", hideVideoControl, false);
window.addEventListener("scroll", checkScroll, false);
window.addEventListener("resize", resetHeader, false);
moreChars.addEventListener("click", displayChars, false);
hambMenu.addEventListener("click", menuAnimation, false);
teaser.addEventListener("click", togglePlayVideo, false);
teaser.addEventListener("timeupdate", slideProgress, false);
trailer.addEventListener("click", togglePlayVideo, false);
trailer.addEventListener("timeupdate", slideProgress, false);
for (var i = 0; i < menuBtn.length; i++) {
  menuBtn[i].addEventListener("click", scrollSection, false);
}
for (var i = 0; i < overVideo.length; i++) {
  overVideo[i].addEventListener("click", togglePlayOver, false);
}
for (var i = 0; i < playBtn.length; i++) {
  playBtn[i].addEventListener("mouseover", overButton, false);
  playBtn[i].addEventListener("mouseout", outButton, false);
  playBtn[i].addEventListener("click", togglePlayBtn, false);
}
for (var i = 0; i < seekBar.length; i++) {
  seekBar[i].addEventListener("change", moveVideo, false);
  seekBar[i].addEventListener("mousedown", seekPause, false);
  seekBar[i].addEventListener("mouseup", seekPlay, false);
}
for (var i = 0; i < volumeBtn.length; i++) {
  volumeBtn[i].addEventListener("mouseover", overVolButton, false);
  volumeBtn[i].addEventListener("mouseout", outButton, false);
  volumeBtn[i].addEventListener("click", muteVideo, false);
}
for (var i = 0; i < volumeBar.length; i++) {
  volumeBar[i].addEventListener("mouseout", outVolBar, false);
  volumeBar[i].addEventListener("change", changeVolume, false);
}
for (var i = 0; i < fullBtn.length; i++) {
  fullBtn[i].addEventListener("mouseover", overButton, false);
  fullBtn[i].addEventListener("mouseout", outButton, false);
  fullBtn[i].addEventListener("click", fullScreen, false);
}
photos[0].addEventListener("mouseover", showArrows, false);
photos[0].addEventListener("mouseout", hideArrows, false);
leftArrow.addEventListener("mouseover", showArrows, false);
leftArrow.addEventListener("mouseout", hideArrows, false);
leftArrow.addEventListener("click", previousPhoto, false);
rightArrow.addEventListener("mouseover", showArrows, false);
rightArrow.addEventListener("mouseout", hideArrows, false);
rightArrow.addEventListener("click", nextPhoto, false);
for (var i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", showPhoto, false);
}
for(var i = 0; i < socialIcon.length; i++) {
  socialIcon[i].addEventListener("mouseover", iconOver, false);
  socialIcon[i].addEventListener("mouseout", iconOut, false);
}
})();
