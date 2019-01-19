import { LightningElement, track, api } from 'lwc';
import spotifySDK from '@salesforce/resourceUrl/SpotifySDK';
import spotifyAuthenticate from '@salesforce/apex/SpotifyAPI.authenticate';
import spotifyPlay from '@salesforce/apex/SpotifyAPI.play';
import utils from 'c/utils';

export default class Player extends LightningElement {

    @api clientId;
    @api clientSecret;
    authorization = 'BQD6kHKmQck7Mbo4X3KL97gKxNV3rYmkJl06aBkC2OxyARYFaMvsNoXzENuos3fpJ6gu0Je-YlT4sVL-z2VbSCTsRn8VAB5FxquBeNHaMo9dcGIak2UVqZ7k360oOz8G42fkaieWCL7mkKUYhyM2wBSBH7dizEkS';
    @track _song;
    @track _songDuration;
    @track playerClasses = 'player';
    spotifyPlayer;

    @api get song() {
        return this._song;
    }

    set song(value) {
        if (!value) return;
        if (this.playerClasses.indexOf('expand') < 0) this.playerClasses += ' expand';
        this._song = value;
        this.play();
        this._songDuration = this.convertMSToMinutes(value.duration_ms);
    }

    connectedCallback() {
        this.initializeSpotifySDK();
    }

    convertMSToMinutes(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    // Doesn't work because EME isn't enabled :(
    async initializeSpotifySDK() {

        window.onSpotifyWebPlaybackSDKReady = async () => {
            console.log('in here');
            const token = this.authorization;
            this.spotifyPlayer = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });
            console.log(Spotify);
            console.log(this.spotifyPlayer);
            // Error handling
            this.spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
            this.spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
            this.spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
            this.spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            this.spotifyPlayer.addListener('player_state_changed', state => { console.log(state); });
            // Ready
            this.spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            console.log(this.spotifyPlayer);
            utils.log(this.spotifyPlayer);

            this.spotifyPlayer.connect().then(success => {
                console.log('success?', success);
            });
        };

        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', spotifySDK);
        let onload = new Promise((resolve, reject) => {
            xhttp.onload = async function(event) {
                resolve(event);
            }
        });
        xhttp.send();
        await onload;
        
        eval(xhttp.response);
    }

    async play() {
        let res = await spotifyPlay({authorization: this.authorization, uriJSON: JSON.stringify({uris:[this._song.uri]}), device: this.spotifyPlayer._options.id});
        console.log('play res', res);
    }
}