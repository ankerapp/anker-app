import { THEME } from '../config.js';

class View {

    #data;
    #errorMessage = "Bad Request. Please try again!";

    #parentElem = document.querySelector('.app-container');

    async render(data) {
        if (!data) return this.renderError();
        this.#data = data;

        const theme = await import(`../themes/${THEME}`);
        const view = theme.default;

        let markup = view._generateHeaderMarkup(this.#data);
        markup += view._generateBodyMarkup(this.#data);
        markup += view._generateFooterMarkup();

        this.#clear();
        this.#parentElem.insertAdjacentHTML('afterbegin', markup);

        // Run theme relates scripts
        view._initScripts(this.#data);
    }

    #clear() {
        this.#parentElem.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="app-body app-body__load">
                <div class="spinner">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                       <line x1="12" y1="6" x2="12" y2="3"></line>
                       <line x1="16.25" y1="7.75" x2="18.4" y2="5.6"></line>
                       <line x1="18" y1="12" x2="21" y2="12"></line>
                       <line x1="16.25" y1="16.25" x2="18.4" y2="18.4"></line>
                       <line x1="12" y1="18" x2="12" y2="21"></line>
                       <line x1="7.75" y1="16.25" x2="5.6" y2="18.4"></line>
                       <line x1="6" y1="12" x2="3" y2="12"></line>
                       <line x1="7.75" y1="7.75" x2="5.6" y2="5.6"></line>
                    </svg>
                </div>
            </div>
        `;

        this.#clear();
        this.#parentElem.insertAdjacentHTML('afterbegin', markup);
    }

    renderError() {
        const markup = `
            <div class="app-body app-body__load">
                <div class="error">
                    ${this.#errorMessage}
                </div>
            </div>
        `;

        this.#clear();
        this.#parentElem.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * Runs theme related scripts.
     *
     * @callback init
     */
    initThemeScripts(init) {
        init();
    }

}

export default new View();
