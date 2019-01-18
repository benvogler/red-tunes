import { styles } from 'c/styles';

let stylesLoaded = false;

export default {
    /**
     * Wrapper for console.log that uses the JSON trick to circumvent the locker service
     * This won't work for certain objects and will also strip anything that cannot be
     * stored as JSON, such as functions
     * @param  {...any} params params to be passed directly to console.log
     */
    log(...params) {
        console.log(JSON.parse(JSON.stringify(...params)));
    },

    /**
     * Load any styles that ignore the Shadow DOM from the `styles` component
     */
    loadStyles() {
        if (stylesLoaded) return;
        stylesLoaded = true;
        
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles;
        document.body.appendChild(style);
    }
}