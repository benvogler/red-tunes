import { LightningElement, api, track } from 'lwc';
import utils from 'c/utils';

export default class RedTunes extends LightningElement {

    @api
    spotifyClientId;

    @api
    spotifyClientSecret;

    @track
    spotifyTokensLoaded = false;

    constructor() {
        super();
        utils.loadStylesAndResources();
        console.log(this.spotifyClientSecret);
        console.log(this.spotifyClientId);
        window.setTimeout(() => {
            console.log(this.spotifyClientSecret);
            console.log(this.spotifyClientId);
            this.spotifyTokensLoaded = true;
        }, 1000);
    }
}