import { LightningElement, api } from 'lwc';
import utils from 'c/utils';

export default class RedTunes extends LightningElement {

    @api
    spotifyClientId;

    @api
    spotifyClientSecret;

    constructor() {
        super();
        utils.loadStyles();
        console.log(this);
    }
}