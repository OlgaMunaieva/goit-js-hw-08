// import Player from '@vimeo/player';

const iframeEl = document.getElementById('vimeo-player');
console.log(iframeEl);

iframeEl.insertAdjacentHTML(
  'afterend',
  `<script>import Player from '@vimeo/player';</script><script src="https://player.vimeo.com/api/player.js"></script>
<script>
    const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });
</script>`
);
