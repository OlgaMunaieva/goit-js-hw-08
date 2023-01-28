import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';
const iframeEl = document.getElementById('vimeo-player');
const player = new Player(iframeEl);

player.on('play', () => console.log('played the video!'));

player.getVideoTitle().then(title => console.log('title:', title));

player.on(
  'timeupdate',
  throttle(
    () =>
      player
        .getCurrentTime()
        .then(seconds => localStorage.setItem(CURRENT_TIME, seconds)),
    1000
  )
);

console.log(localStorage.getItem(CURRENT_TIME));
player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
