import { JSON_URL, SHEET_ID } from '../config';
import { AJAX, fetchSheetData } from '../helpers';

class Model {

    state = { data: {} };
    #sheetBaseURL;
    #sheetDataType;
    #sheetLinks;
    #sheetBio;
    #linksURL;
    #bioURL;

    constructor() {
        this.#sheetBaseURL = 'https://docs.google.com/spreadsheets/d/';
        this.#sheetDataType = `/gviz/tq?tqx=out:json&headers=1`;
        this.#sheetLinks = 'links';
        this.#sheetBio = 'profile-data';

        if (SHEET_ID !== null) {
            this.#linksURL = this.#sheetBaseURL + SHEET_ID + this.#sheetDataType + '&sheet=' + encodeURIComponent(this.#sheetLinks);
            this.#bioURL = this.#sheetBaseURL + SHEET_ID + this.#sheetDataType + '&sheet=' + encodeURIComponent(this.#sheetBio);
        }
    }

    async loadData() {
        try {
            if (SHEET_ID !== null) {
                const linksData = await fetchSheetData(this.#linksURL);
                const bioData = await fetchSheetData(this.#bioURL);
                this.state.data = linksData;
                this.state.data.name = bioData.bio?.name;
                this.state.data.profilePic = bioData.bio?.profilePic;
                this.state.data.desc = bioData.bio?.description;
            } else {
                const data = await AJAX(JSON_URL);
                this.state.data = data;
            }
        } catch(err) {
            throw err;
        }
    }

}

export default new Model();
