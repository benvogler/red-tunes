import { LightningElement } from 'lwc';
const css = (_)=>_;

export class Styles extends LightningElement {
    styles = styles;
}

/**
 * These styles are used for overriding styles that cannot be conventionally
 * targeted in LWC due to the css preprocessor's extremely strict approach
 * to CSS encapsulation. Despite Salesforce's best efforts, there are many
 * hacky ways to circumvent their sandboxing of LWCs currently.
 * Expect this to break at any time as they will no doubt wise up to this,
 * as it's not possible in Aura components.
 */
export const styles = css`
    c-search-result .song, c-search-result .artist {
        /* I think this gets sanitized? of all the things to sanitize, THIS gets sanitized?
           Anyway, that's why it's here and not in searchResult.css
           Excellent job lightning team!
        */
        -webkit-box-orient: vertical;
    }
`;
