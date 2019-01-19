console.log('loaded');
let xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://sdk.scdn.co/spotify-player.js');
xhttp.onload = () => {
    eval(xhttp.response);
}

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQD-XBZmMVB2H7tBmHngLJMfp8jTL-LwEMQ_ci5tL3wccSb4Q3NMpAodl-7aj11k9GuBPmgZqGiVOuWlHsHjaFE-BgjgPiIXiP9vzGUKSobvgTFu1eXgTqmVrlsc0GXXwC0GbTs6NnPlEWHzbVet71E54Zl5hyc0';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect().then(success => {
        console.log('success?', success);
    });
    console.log(player._options.id);
};
xhttp.send();