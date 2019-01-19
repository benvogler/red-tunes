import { LightningElement, api, track } from 'lwc';
import utils from 'c/utils';

export default class RedTunes extends LightningElement {

    @api spotifyClientId;
    @api spotifyClientSecret;
    @track spotifyTokensLoaded = false;

    @track isPlaying = false;

    @track songs = [];
    @track selectedSong;


    connectedCallback() {
        utils.loadStylesAndResources();
        if (!this.spotifyClientId || !this.spotifyClientSecret) return;
        this.spotifyTokensLoaded = true;
    }

    handleSearch(data) {
        utils.log(data.detail);
        this.songs = data.detail.tracks.items.map(song => {
            let thumbnails = {};
            for (let image of song.album.images) {
                switch (image.height) {
                    case 640:
                        thumbnails.large = image;
                        break;
                    case 300:
                        thumbnails.medium = image;
                        break;
                    case 64:
                        thumbnails.small = image;
                        break;
                }
            }
            console.log('thumbnails', thumbnails);
            song.thumbnails = thumbnails;
            song.artistsNames = song.artists.map(artist => artist.name).join(', ');
            console.log('artists names', song.artistsNames);
            return song;
        });
        utils.log('songs', this.songs);
    }

    handlePlay(data) {
        this.selectedSong = data.detail;
        this.isPlaying = true;
    }
}