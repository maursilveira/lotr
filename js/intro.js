(function() {
  "use strict";

  var shire = document.querySelector("#shire");
  var sauron = document.querySelector("#sauron");
  var mordor = document.querySelector("#mordor");
  var ring = document.querySelector("#ring");
  var skipBtn = document.querySelector("#skipIntro");
  var enterBtn = document.querySelector("#enterBtn");

  var introTl = new TimelineLite();
  var skipTl = new TimelineLite({
    paused: true
  })

  // function to check if mobile and tablet devices are running on landscape orientation
  // if so, change images of intro for landscape
  function checkLandscape() {
    if (window.innerWidth > window.innerHeight) {
      var shirePic = shire.querySelector("img");
      var sauronPic = sauron.querySelector("img");
      var mordorPic = mordor.querySelector("img");
      var ringPic = ring.querySelector("img");

      if (window.innerWidth < 640) {
        shirePic.src = "images/shire_small_landscape.jpg";
        sauronPic.src = "images/sauron_eye_small_landscape.jpg";
        mordorPic.src = "images/mordor_small_landscape.jpg";
        ringPic.src = "images/ring_small_landscape.jpg";
      }
      else if (window.innerWidth < 1024) {
        shirePic.src = "images/shire_medium_landscape.jpg";
        sauronPic.src = "images/sauron_eye_medium_landscape.jpg";
        mordorPic.src = "images/mordor_medium_landscape.jpg";
        ringPic.src = "images/ring_medium_landscape.jpg";
      }
    }
  }

  // function to run introduction
  function runIntro() {
    checkLandscape();

    // timeline with introduction
    introTl.to(shire, 3, {opacity: 1}, "+=1.0");
    introTl.to(sauron, 0.2, {opacity: 1}, "+=1.0");
    introTl.to(sauron, 0.1, {opacity: 0});
    introTl.to(shire, 0.1, {filter: "grayscale(40%) brightness(80%)"}, "-=0.1");
    introTl.to(sauron, 0.2, {opacity: 1}, "+=1.0");
    introTl.to(sauron, 0.2, {opacity: 0});
    introTl.to(shire, 0.2, {filter: "grayscale(80%) brightness(40%)"}, "-=0.2");
    introTl.to(sauron, 0.5, {opacity: 1}, "+=1.5");
    introTl.to(mordor, 1.5, {opacity: 1}, "+=3.0");
    introTl.to(skipBtn, 0.1, {display: "none"}, "+=2.0");
    introTl.to(ring, 3, {opacity: 1});
    introTl.to(enterBtn, 2, {opacity: 1});
  }

  // function to run timeline without introduction
  function runSkip() {
    skipTl.to(skipBtn, 0.1, {display: "none"});
    skipTl.to(ring, 1, {opacity: 1});
    skipTl.to(enterBtn, 2, {opacity: 1});
  }

  // function to kill intro and call timeline without intro
  function skipIntro() {
    introTl.kill();
    skipTl.play();
  }

  window.addEventListener("load", runIntro, false);
  window.addEventListener("load", runSkip, false);
  skipBtn.addEventListener("click", skipIntro, false);
})();
