import { LightningElement } from 'lwc';
import fontAwesome from '@salesforce/resourceUrl/FontAwesome';
import heebo from '@salesforce/resourceUrl/Heebo';


export default class Logo extends LightningElement {

    musicIcon = fontAwesome + '/sprites/solid.svg#music';

    constructor() {
        super();
        this.loadFontAwesome();
    }

    loadFontAwesome() {

        for (let url of [fontAwesome + '/css/all.css', heebo + '/css.css']) {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            document.head.appendChild(link);
        }

        let css = (_)=>_;

        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css`@keyframes animateLogo {
            0% {
                fill: #EE2E24;
                transform: scale(1, 1) translate3d(0, -30px, 0);
            }
            50% {
                fill: #960000;
                transform: scale(1.2, 1.2) translate3d(0, -24px, 0);
            }
            95% {
                fill: #EE2E24;
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
            25% {
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }`;
        document.head.appendChild(style);
    }
}