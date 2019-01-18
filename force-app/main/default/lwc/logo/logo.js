import { LightningElement } from 'lwc';
import fontAwesome from '@salesforce/resourceUrl/FontAwesome';
import utils from 'c/utils';


export default class Logo extends LightningElement {

    musicIcon = fontAwesome + '/sprites/solid.svg#music';

    constructor() {
        super();
        utils.loadStylesAndResources();
        this.loadAnimations();
    }

    loadAnimations() {
        let css = (_)=>_;

        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css`@keyframes animateLogo {
            0% {
                fill: #EE2E24;
                transform: scale(1, 1) translate3d(0, -30px, 0);
            }
            20% {
                fill: #960000;
                transform: scale(1.2, 1.2) translate3d(0, -24px, 0);
            }
            38% {
                fill: #EE2E24;
            }
            40% {
                fill: #EE2E24;
                transform: scale(1, 1) translate3d(0, -30px, 0);
            }
            100% {
                fill: #EE2E24;
                transform: scale(1, 1) translate3d(0, -30px, 0);
            }
        }
        
        @keyframes ping {
            0% {
                transform: scale(.5);
                opacity: 0;
            }
            5% {
                opacity: 0.8;
            }
            40% {
                transform: scale(.8);
                opacity: 0;
            }
            100% {
                transform: scale(.8);
                opacity: 0;
            }
        }`;
        document.head.appendChild(style);
    }
}