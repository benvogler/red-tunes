import { LightningElement, track, api, wire } from 'lwc';
import utils from 'c/utils';
import authenticate from '@salesforce/apex/SpotifyAPI.authenticate';

export default class Search extends LightningElement {

    @api clientId;
    @api clientSecret;
    authorization;
    
    @track search = '';

    @track searching;

    @track searchIconClasses = 'fas fa-search';

    constructor() {
        super();
        utils.loadStylesAndResources();
        this.toggleSearching(false);
        window.setTimeout(() => {
            console.log(this.clientId);
            console.log(this.clientSecret);
            /*
            authenticate({clientId: this.clientId, clientSecret: this.clientSecret}).then(res => {
                console.log(res);
                console.log(JSON.parse(res));
            })*/
        }, 2000);
    }

    toggleSearching(value) {
        if (value === undefined) {
            this.searching = !this.searching;
        } else {
            this.searching = value;
        }

        this.searchIconClasses.replace(' visible', '');

        if (!this.searching) {
            this.searchIconClasses += ' visible';
        }
    }
}