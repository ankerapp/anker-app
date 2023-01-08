class View {

    #data;
    #errorMessage = "Bad Request. Please try again!";

    #parentElem = document.querySelector('.app-container');

    render(data) {
        if (!data) return this.renderError();
        this.#data = data;

        let markup = this.#generateHeaderMarkup(this.#data);
        markup += this.#generateBodyMarkup(this.#data);
        markup += this.#generateFooterMarkup();

        this.#clear();
        this.#parentElem.insertAdjacentHTML('afterbegin', markup);
    }

    #generateHeaderMarkup(data) {
        return `
            <header class="header">
                <div class="header__image-box">
                    <img id="header__image" class="header__image" src="${data.profilePic}" alt="Profile Pic">
                </div>
                <div class="header__profile-username">
                    <p class="header__username lead">${data.name}</p>
                </div>
            </header>
        `;
    }

    #generateBodyMarkup(data) {
        return `
            <section class="app-body">
                <ul class="links">
                    ${data.links.map(this.#generateLinksMarkup).join('')}
                </ul>
                <ul class="social-links">
                    ${data.socials.map(this.#generateSocialsMarkup).join('')}
                </ul>
            </section>
        `;
    }

    #generateFooterMarkup() {
        return `
            <footer class="footer">
                <div class="footer__logo-box">
                    <svg width="0" height="0" class="hidden">
                      <symbol version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xmlnsSvg="http://www.w3.org/2000/svg" viewBox="0 0 21.62109 32.271481">
                        <g inkscapeLabel="Layer 1" inkscapeGroupmode="layer" id="layer1" transform="translate(-94.189455,-132.36426)">
                          <g id="g1427" transform="translate(-438.64257,-4.54199)">
                            <path d="m 543.64258,141.74805 c -5.95526,0 -10.81055,4.85529 -10.81055,10.81054 0,5.95526 4.85529,10.8125 10.81055,10.8125 5.95525,0 10.81054,-4.85724 10.81054,-10.8125 0,-5.95525 -4.85529,-10.81054 -10.81054,-10.81054 z m 0,2.64453 c 4.52534,0 8.16601,3.64067 8.16601,8.16601 0,4.52535 -3.64067,8.16602 -8.16601,8.16602 -4.52534,0 -8.16602,-3.64067 -8.16602,-8.16602 0,-4.52534 3.64068,-8.16601 8.16602,-8.16601 z" id="circle1358"></path>
                            <path d="m 536.64453,163.9707 a 1.322915,1.322915 0 0 0 -1.67969,0.82032 1.322915,1.322915 0 0 0 0.82032,1.68164 l 7.85742,2.70507 7.85937,-2.70507 a 1.322915,1.322915 0 0 0 0.82032,-1.68164 1.322915,1.322915 0 0 0 -1.68165,-0.82032 l -6.99804,2.40821 z" id="path1360"></path>
                            <path d="m 536.18555,136.90625 a 1.322915,1.322915 0 0 0 -1.32227,1.32227 1.322915,1.322915 0 0 0 1.32227,1.32421 h 14.91406 a 1.322915,1.322915 0 0 0 1.32226,-1.32421 1.322915,1.322915 0 0 0 -1.32226,-1.32227 z" id="path1362"></path>
                          </g>
                        </g>
                      </symbol>
                    </svg>
                    <svg class="logo"><use href="#logo"/></svg>
                </div>
            </footer>
        `;
    }

    #generateLinksMarkup(link) {
        return `<li class="link-item"><a class="link" href="${link.link}">${link.title}</a></li>`;
    }

    #generateSocialsMarkup(social) {

        return `<li class="social-link-item">
            <a class="social-link" href="${social.link}">
                <svg class="social-icon">
                    <use href="./assets/tabler-sprite.svg#tabler-brand-${social.title}"/>
                </svg>
            </a>
        </li>`;
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

}

export default new View();
