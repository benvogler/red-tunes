import { LightningElement, api, track } from 'lwc';
import fontAwesome from '@salesforce/resourceUrl/FontAwesome';
import utils from 'c/utils';


export default class Logo extends LightningElement {

    musicIcon = fontAwesome + '/sprites/solid.svg#music';

    @track _isPlaying;
    
    @api get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(value) {
        this._isPlaying = value;
    }

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
        }

        @keyframes color {
            0% {
                fill: red;
            }
            50% {
                fill: #EE24E2;
            }
            100% {
                fill: red;
            }
        }
        
        @keyframes dance {
            0% {
                transform: rotate(0) scale(1);
            }
            25% {
                transform: rotate(-10deg) scale(1.3);
            }
            50% {
                transform: rotate(0) scale(1);
            }
            75% {
                transform: rotate(10deg) scale(1.2);
            }
            100% {
                transform: rotate(0) scale(1);
            }
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(244,18,113, 0.4);
            }
            50% {
                box-shadow: 0 0 0 100px rgba(238,36,226, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(238,36,226, 0);
            }
        }`;
        document.head.appendChild(style);
    }
}