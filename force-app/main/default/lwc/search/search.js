import { LightningElement, track, api, wire } from 'lwc';
import utils from 'c/utils';
import spotifyAuthenticate from '@salesforce/apex/SpotifyAPI.authenticate';
import spotifySearch from '@salesforce/apex/SpotifyAPI.search';

export default class Search extends LightningElement {

    @api clientId;
    @api clientSecret;
    authorization;

    @track searching;

    @track searchIconClasses = 'fas fa-search';

    constructor() {
        super();
        utils.loadStylesAndResources();
        this.toggleSearching(false);
    }

    toggleSearching(value) {
        if (value === undefined) {
            this.searching = !this.searching;
        } else {
            this.searching = value;
        }

        this.searchIconClasses = this.searchIconClasses.replace(' visible', '');

        if (!this.searching) {
            this.searchIconClasses += ' visible';
        }
    }

    async search(event) {
        let searchValue = this.template.querySelector('input').value;
        this.toggleSearching(true);
        
        let res = await spotifyAuthenticate({clientId: this.clientId, clientSecret: this.clientSecret});
        res = JSON.parse(res);

        res = await spotifySearch({token: res.access_token, query: escape(searchValue)});
        res = JSON.parse(res);
        
        this.toggleSearching(false);
        this.dispatchEvent(new CustomEvent('search', { detail: res }));
    }
}