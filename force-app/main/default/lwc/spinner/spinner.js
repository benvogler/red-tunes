import { LightningElement, api, track } from 'lwc';

export default class Spinner extends LightningElement {

    _color = '#000000';

    @track classes = 'fas fa-circle-notch spinner visible';
    @track wrapperClasses = 'wrapper';
    @track styles = 'color: ' + this._color;

    @api get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
        this.styles = 'color: ' + this._color;
    }

    _spin = true;

    @api get spin() {
        return this._spin;
    }
    
    _inSearch;

    @api get inSearch() {
        return this._inSearch;
    }

    set inSearch(value) {
        this._inSearch = value;
        if (value) {
            this.classes = 'search ' + this.classes;
            this.wrapperClasses = 'search ' + this.wrapperClasses;
        }
    }

    set spin(value) {
        this._spin = value;
        this.classes = this.classes.replace(' visible', '');
        if (value) {
            this.classes += ' visible';
        }
    }

    constructor() {
        super();
        this.loadAnimation();
    }

    loadAnimation() {
        let css = (_)=>_;
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css`
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(359deg);
            }
        }`;
        document.head.appendChild(style);
    }
}