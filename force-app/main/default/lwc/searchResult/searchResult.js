import { LightningElement, api, track } from 'lwc';

export default class SearchResult extends LightningElement {

    @api song;

    play() {
        this.dispatchEvent(new CustomEvent('play', { detail: JSON.parse(JSON.stringify((this.song))) }));
    }
}