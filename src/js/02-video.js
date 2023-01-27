import Player from '@vimeo/player';
import lodash from 'lodash.throttle';

const CURRENT_TIME = 'current time';

const iframeEl = document.getElementById('vimeo-player');
console.log(iframeEl);

const player = new Player(iframeEl);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  () => {
    player.getCurrentTime().then(function (seconds) {
      // seconds = the current playback position
      console.log(seconds);
      localStorage.setItem(CURRENT_TIME, seconds);
      const time = seconds;
      console.log(time);
      // player.setCurrentTime(Number(seconds));
    });
  },
  300
);

function getCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    // seconds = the current playback position
    console.log(seconds);
    localStorage.setItem(CURRENT_TIME, seconds);
    const time = seconds;
    console.log(time);
    // player.setCurrentTime(Number(seconds));
  });
  // console.log(currentTime);
}

// console.log(currentTime);
console.log(localStorage.getItem(CURRENT_TIME));
player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
