import FreeFall from '../plugins/FreeFall';
import apps from '../plugins/Apps';

class DefaultThemeBasic {

    _generateHeaderMarkup(data) {
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

    _generateBodyMarkup(data) {
        return `
            <section class="app-body">
                <div class="links">
                    ${data.links.map(this.#generateLinksMarkup).join('')}
                </div>
                <ul class="social-links">
                    ${data.socials.map(this.#generateSocialsMarkup).join('')}
                </ul>
            </section>
        `;
    }

    _generateFooterMarkup() {
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
        let markup;
        if (link.hasOwnProperty('type')) {
            markup = `
                <div class="link-item">
                    <div class="link-item__container">
                        <div class="link__app" data-app-id="${link.app}">
                            <div class="link__app-container">
                                <div class="link__app-content"></div>
                                <div class="link__app-close-btn">
                                    <span class="link__app-close-icon-box" data-app-close="${link.app}">
                                        <svg class="tabler-icon link__app-close-icon">
                                            <use href="./assets/tabler-sprite.svg#tabler-x"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="link-item__btn-container">
                            <button class="link-item__button link" data-type="${link.type}" data-app-trigger="${link.app}">
                                <span class="link__text">${link.title}</span>
                                <span><svg class="tabler-icon link__icon">
                                    <use href="./assets/tabler-sprite.svg#tabler-chevron-down"/>
                                </svg></span>
                            </button>
                        </div>
                    </div>
                </div>
            `
        } else {
            markup = `
                <div class="link-item">
                    <a class="link" href="${link.link}">${link.title}</a>
                </div>
            `
        }

        return markup;
    }

    #generateSocialsMarkup(social) {
        return `<li class="social-link-item">
            <a class="social-link" href="${social.link}">
                <svg class="tabler-icon social-icon">
                    <use href="./assets/tabler-sprite.svg#tabler-brand-${social.title}"/>
                </svg>
            </a>
        </li>`;
    }

    _initScripts(data) {

        // Scale link on hover
        const links = document.querySelectorAll('.link');
        links.forEach(link => {
            link.addEventListener('mouseenter', (event) => {
                event.target.style.transform = 'scale(1.05)';
                event.target.style.transition = 'all .2s';
            })

            link.addEventListener('mouseleave', (event) => {
                event.target.style.transform = 'scale(1)';
            })
        });

        // Dropdown and Apps setup using FreeFall and Apps plugins
        const freeFall = new FreeFall({
            showDropdownCSS: 'link__app-show',
            dataAttributes: {
                trigger: 'data-app-trigger',
                closer: 'data-app-close',
                id: 'data-app-id'
            }
        });

        // Extract apps related data from data object
        const embedLinks = new Map();
        data.links.forEach((link) => {
            if (link.hasOwnProperty('app')) {
                embedLinks.set(`${link.app}`, `${link.link}`);
            }
        });

        const ddApp = document.querySelector('[data-app-id="youtube"]');
        ddApp.addEventListener('afterDrop', (event) => {
            const targetApp = event.detail;
            const targetElem = targetApp.querySelector('.link__app-content');

            targetElem.innerHTML = apps._appYouTube(embedLinks.get('youtube'));
        });

    }

}

export default new DefaultThemeBasic();
