import { styles } from 'c/styles';
import heebo from '@salesforce/resourceUrl/Heebo';
import fontAwesome from '@salesforce/resourceUrl/FontAwesome';

let stylesLoaded = false;

export default {
    /**
     * Wrapper for console.log that uses the JSON trick to circumvent the locker service
     * This won't work for certain objects and will also strip anything that cannot be
     * stored as JSON, such as functions
     * @param  {...any} params params to be passed directly to console.log
     */
    log(...params) {
        let copies = [];
        for (let param of params) {
            if (typeof params === 'object') copies.push(JSON.parse(JSON.stringify(param)));
            else copies.push(param);
        }
        console.log(...copies);
    },

    /**
     * Load any styles that ignore the Shadow DOM from the `styles` component
     */
    loadStylesAndResources() {
        if (stylesLoaded) return;
        stylesLoaded = true;
        
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles;
        document.body.appendChild(style);

        for (let url of [fontAwesome + '/css/all.css', heebo + '/css.css']) {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            document.head.appendChild(link);
        }
    }
}