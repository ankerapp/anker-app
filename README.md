# Anker
Anker is a very light weight template for social media bio links like Linktree. 
The template is very little SASS and JS code that anybody can customize in few 
minutes. With Anker you can make Landing Pages super fast and super easy.

# Table of contents
1. [Demo](#demo)
2. [Why not just use Linktree or similar apps?](#why-anker)
3. [The Codebase](#codebase)
4. [How do I make my own themes](#how)
    * [Get the source code](#get-source-code)
    * [The SASS files](#sass-files)
    * [The theme file](#theme-file)
    * [The JSON file](#json-file)
    * [Using Google Sheets as backend](#google-sheets)
5. [I want more customization](#more-customization)
    * [The JS file](#js-files)
    * [Let's have a look what is inside the theme files](#what-is-inside-theme)
        * [Default theme basic](#theme-basic)
        * [Default theme pro](#theme-pro)
        * [Imports](#imports)
        * [Header, body and footer markup](#header-body-footer)
        * [Links markup](#links-markup)
        * [Socials markup](#socials-markup)
        * [Init scripts](#init-scripts)
6. [Deployment](#deployment)
7. [Contributing to Anker](#contribution)

### Demo <a name="demo"></a>
See the [Demo Here](https://ankerdemo.netlify.app/) with the default theme!

### Why not just use Linktree or similar apps? <a name="why-anker"></a>
You can use Linktree or other similar apps if you want but there are some 
reasons why you don't have to or don't want to.

1. Linktree and similar apps don't allow you to customize your theme
2. If you want better themes you can't get them at least not for free
3. You can't use your own DOMAIN NAME
4. As developers we like customizability and like to make our own things. If
   you want to make your own theme well, you can't.
5. If your client wants a bio link you can just use Anker and customize it to
   suit their needs. Also you can use their domain name and not some weird 
   websites that have extensions like `.ee`, `.bio`, `.site` etc. It can be
   done in few minutes and can easily make you some extra $$.
6. You can use this template and make your favorite theme and sell it on
   Gumtree or similar apps. This however is not the motivation behind Anker but it
   certainly is a possibility.
7. As developers we have our own domain names and can design better landing
   pages. it's always better to have `john.com/bio` than `linktr.ee/john` or
   `bio.site/john`.

Finally, you can now make your own bio links/ landing pages for free in a matter of
minutes.

### The Codebase <a name="codebase"></a>
The whole template is made up of some SASS and JS files. The data is served from a
JSON file. The JSON file can either be stored locally or served from somewhere else
ideally raw JSON from GitHub. The only problem with reading raw data from GitHub is
that it might be slower than reading from local file.

The best option however is services like Netlify, Cloudflare pages etc. Netlify's
starter plan allows you to host your data/website for free. You can host both your
`data.json` file and profile picture. The best part is that your data is hosted on
their CDN so it's super fast. [Netlify
Solution](https://github.com/ankerapp/anker-app#how-to-host-your-json-file-on-netlify)

# How do I make my own theme <a name="how"></a>

### Get the source code <a name="get-source-code"></a>
First, clone this repo. Run the following command to install all the dependencies.
```bash
npm install
```
After the dependencies are installed you want to watch for changes and start a live
server by running the command below.
```bash
npm run start
```
Now you want to navigate to `sass/` directory and start customizing.

### The SASS Files <a name="sass-files"></a>
```
.
├── abstracts
│   ├── _fonts.scss
│   ├── _index.scss
│   ├── _mixins.scss
│   └── _variables.scss
├── base
│   ├── _base.scss
│   ├── _grid.scss
│   ├── _index.scss
│   └── _typography.scss
├── layout
│   ├── _body.scss
│   ├── _footer.scss
│   ├── _header.scss
│   └── _index.scss
├── main.scss
└── themes
    ├── _classic-dark.scss
    ├── _classic-light.scss
    ├── _index.scss
    ├── _modern-dark.scss
    └── _modern-light.scss
```

### The theme file <a name="theme-file"></a>
The file tree above shows a directory called `themes/` with some themes inside.
Those are your theme files you can create as many themes you want. There isn't
much to be changed. The whole template has a background, profile picture, name
and the links. Inside your theme file you can change all those things. See the
code below:

```scss
@use '../abstracts' as *;

// Here you can define your own variables for colors etc

body {
    color: var(--color-primary);
    background-color: var(--color-background);
    font-weight: var(--font-weight-regular);
}

.logo {
    fill: var(--color-primary);
}

.links {
    list-style: none;
}

.link {
    &:link,
    &:visited {
        text-decoration: none;
        display: block;
        color: var(--color-white);
        background-color: var(--color-primary);
        padding: 1.5rem;
        border-radius: .5rem;
        text-align: center;
    }    
}

.link-item {
    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
}

.social-links {
    list-style: none;
    display: flex;
    margin-top: 5rem;
    grid-column-gap: 2rem;
    justify-content: center;
}

.social-link {
    &:link,
    &:visited {
        text-decoration: none;
        display: block;
        color: var(--color-primary);
    }    
}

.social-icon {
    width: 25px;
    height: 25px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;

    cursor: pointer;
}
```

Before you start customizing add your theme file to `_index.scss` inside
`themes` directory so it can be compiled for use. You only have to add the theme
you want to use not all of them if you have more than one. Also copy `data.json`
file to your dist so you have data to test during development. Normally inside
`src/js/config.js` the data will be linked.

See the content of `src/themes/_index.scss` file below:

```scss
@forward "classic-dark";
```

* For the `background` you can have whatever you want simple one color, gradient,
gradient mesh, image, video etc.
* The `.logo` class sets the fill property of the Anker logo in footer. The
    logo has to be in the footer.
* The `.link` class is the one you want to change. You can add hover effects to 
    it, animation or even make it drop-down to show some content.
* For the `social-link` you also don't have to do much except for the color. if
    the color is the same as the primary color you can just inherit it from
    parent element.

* This is not all. You can also customize the JS theme file. You might want to
    add description above the links, embed a video or audio, add a mailing list
    subscription form etc. See the JS file customization [here](#more-customization)!

And that's it you now have your own theme. But wait you have to link your
JSON file. If you want to serve the JSON file locally then add your links to
`data.json` file and `npm run build` will copy it to `dist/` directory.
Otherwise you can serve it from somewhere else.

> **Note**: `npm run build` will not copy the `data.json` file on windows. You
might wanna copy it manually.

If you want to publish your theme read [these guidelines](https://github.com/ankerapp/anker-themes#how-do-i-make-a-theme).

### The JSON File <a name="json-file"></a>
The JSON file is very straight forward. `name` is your name you want to show.
`links` are the links that are listed on your bio and `socials` are obviously
your social links object.

```json
{
    "name": "John Doe",
    
    "profilePic": "https://ankerdata.netlify.app/profile-img-logo-only.png",

    "links": [
        {
            "title": "Link One",
            "link": "https://link.com/"
        },
        {
            "title": "Link Two",
            "link": "https://link.com/"
        },
        {
            "title": "Link Three",
            "link": "https://link.com/"
        },
        {
            "title": "Link Four",
            "link": "https://link.com/"
        },
        {
            "title": "Link Five",
            "link": "https://link.com/"
        },
        {
            "title": "Link Six",
            "link": "https://link.com/"
        },
        {
            "title": "Link Seven",
            "link": "https://link.com/"
        }
    ],

    "socials": [
        {
            "title": "github",
            "link": "https://github.com/0xkhan"
        },
        {
            "title": "dribbble",
            "link": "https://dribbble.com/0xkhani"
        },
        {
            "title": "twitter",
            "link": "https://twitter.com/0xkhani"
        },
        {
            "title": "instagram",
            "link": "https://instagram.com/0xkhani"
        }
    ]
}
```

The above JSON file is for the basic theme. For the Pro version of the themes
which include dropdown apps you'll have to add some extra information for the
apps to be recognized. See the key changes below:

```json
{

    { ... },

    "links": [
        {
            "title": "Link One",
            "link": "https://link.com/"
        },
        {
            "title": "Link Two",
            "link": "https://www.youtube.com/embed/gdLLRj1Ge7g",
            "type": "dropdown",
            "app": "youtube"
        },
        {
            "title": "Link Three",
            "link": "https://link.com/"
        },
        {
            "title": "Link Four",
            "link": "https://link.com/",
            "type": "dropdown",
            "app": "spotify"
        }
    ],

    { ... }

}
```

After you're finished with everything just build the project by running `npm run
build`. Now you can take your `dist/` directory and host it on your server. See
the Netlify solution below.

### Using Google Sheets as backend <a name="google-sheets"></a>
Instead of JSON file you can also use Google Sheets as backend for your Anker landing
page. [Here](https://docs.google.com/spreadsheets/d/1tdRaVMG9BSry5SpJCH09VkslR1Sc7tPYH4b5m-RJn9c/edit#gid=0)
is an example of how your Google sheet will look like.

You have to set your Google Sheet permissions `read-only` for everybody.
> **Note:** ONLY read permissions should be global not edit otherwise anybody
can edit your Google sheet!

Inside the `src/js/config.js` file set your Google Sheet ID so it can be read by
Anker and fetch your data from your sheet.

```javascript
export const JSON_URL = null;
export const SHEET_ID = "1tdRaVMG9BSry5SpJCH09VkslR1Sc7tPYH4b5m-RJn9c";
export const TIMEOUT_SEC = 10;
export const THEME = "default-theme-pro";
```

How to get your sheet ID? `SHEET_ID` is the ID you get from your sheet URL for
example:

```
https://docs.google.com/spreadsheets/d/1tdRaVMG9BSry5SpJCH09VkslR1Sc7tPYH4b5m-RJn9c/edit#gid=0
```

Your sheet `SHEET_ID` is inbetween `/d/<sheetId>/edit#`. In the above URL the
`SHEET_ID` is:

```
1tdRaVMG9BSry5SpJCH09VkslR1Sc7tPYH4b5m-RJn9c
```

### How to host your JSON file on Netlify
* Create a directory e.g `my-anker-data/`. See [My Data Repo](https://github.com/0xkhan/anker-data)
* Copy your `data.json` file to `my-anker-data/`
* Initiate a git repository
* Push the repo to GitHub, GitLab, Bitbucket
* Link a new project on Netlify to this repo and deploy

After the data is deployed when you go to
`<netlify-subdomain>.netlify.app/data.json` you should be seeing your JSON data.
However you're not done yet. If you make a request for your data from another
website you'll get a CORS error. To fix this problem you should set the correct
CORS Headers. An easy fix for this is to create a file `netlify.toml` in your
folder `my-anker-data/` inside put the following:
```
[[headers]]
  for = "/*"
    [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "*"
    Access-Control-Allow-Headers = "*"
```

This will allow all origins to make all request for every file in this project.
You can customize this for the level of security you want. Alternatively, you
can use [Netlify
functions](https://benborgers.com/posts/netlify-functions-cors). As mentioned
above you can also put your profile picture in your folder and add the link to
your JSON file like following:
```json
{
    "name": "John Doe",
    "profilePic": "<netlify-subdomain>.netlify.app/profile.jpg",

    "links": "links...",
    "social": "socials..."
}
```

# I want more customization <a name="more-customization"></a>
### The JS Files <a name="js-files"></a>

```
.
├── app
│   ├── Controller.js
│   ├── Model.js
│   └── View.js
├── config.js
├── helpers.js
├── plugins
│   ├── Apps.js
│   └── FreeFall.js
└── themes
    ├── DefaultThemeBasic.js
    └── DefaultThemePro.js
```

Inside `src/js/` there are three directories `app`, `plugins` and `themes`. The
`themes` directory is the one where the themes are. There are two default themes
included in `anker-app` repository.

The `DefaultThemeBasic` is the one with very basic markup. The Pro version of
the theme can do more that just displaying links. In the Pro version you can add
dropdown links and third party apps e.g embedding YouTube video, showing your Patreon
button or mailing list form etc.

The markup for third party apps can be added in the `Apps.js` file inside
`plugins` directory.

## Let's have a look what is inside the theme files <a name="what-is-inside-theme"></a>

### Default theme basic <a name="theme-basic"></a>

```javascript
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
                <ul class="links">
                    ${data.links.map(this.#generateLinksMarkup).join('')}
                </ul>
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

}

export default new DefaultThemeBasic();
```

As you can see above the theme files only contain the markup. You can customize
this file however it suits you. See below what the Pro version of the theme
contains.

### Default theme pro <a name="theme-pro"></a>
```javascript
import FreeFall from '../plugins/FreeFall';
import apps from '../plugins/Apps';

class DefaultThemePro {

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
```

The Pro version of the theme is not very different from the basic version but
it's more customizable. One important thing to note is that all the method names
have to be left as they are. You only have to change the content of the methods.
You can't rename the methods to something else.

Let's break down everything to understand what's going on.

### Imports <a name="imports"></a>
The first part is some `imports`. Those plugins are related to the themes. The first
one is a plugin called `FreeFall` which is responsible for dropdowns. The second
plugin is `Apps` which holds markups for third party apps. You can also add your
own Markup to `Apps.js`.

```javascript
import FreeFall from '../plugins/FreeFall';
import apps from '../plugins/Apps';
```

### Header, body and footer markup <a name="header-body-footer"></a>
The header, body and footer markup methods are self-explanatory and pretty
straight forward. What is however important are the `map()` methods inbetween
markups. The map methods generate markup for example from methods such as
`#generateLinksMarkup()` and `#generateSocialsMarkup()`. See the example below.

```javascript
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
```

### Links markup <a name="links-markup"></a>

```javascript
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
```

As you can see above the links markup for Pro version is different and has much more
HTML than the basic version. The method checks if the data has a `type` property with
which it determines if dropdown should be added. If the `type` property exists then
it adds the dropdown for the app to load in.

### Socials markup <a name="socials-markup"></a>

```javascript
#generateSocialsMarkup(social) {
    return `<li class="social-link-item">
        <a class="social-link" href="${social.link}">
            <svg class="tabler-icon social-icon">
                <use href="./assets/tabler-sprite.svg#tabler-brand-${social.title}"/>
            </svg>
        </a>
    </li>`;
}
```

The markup for the social icons is very straight forward as well. It just loops
through the data and generates the `li` elements for social icons.

### Init scripts <a name="init-scripts"></a>
```javascript
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
```

`_initScripts()` is a protected method that runs all the scripts related to a
specific theme. All your theme related scripts go inside this method.

### Deployment <a name="deployment"></a>
How do you wanna deploy it is up to you. If you want to use Anker as your
landing page then by all means do that but if you already have a website and
wanna use Anker as a bio link to have a link like: `example.com/bio` then
nothing is stopping you from that as well.

If you already have a website then I'd suggest you to merge the code with
your CSS and JS and that will do it. However if you want to use Anker on it's
own either you use your own domain or Netlify. I might have a better method
for you to only deploy your `dist/` directory to live server.

I use Git Submodules for deployment. If you want to use that as well I wrote
[this Gist](https://gist.github.com/0xkhan/8fb65ca3d01020e7aa65b1dbb75cfb10)
explaining exactly that. Check out [Anker's Demo](https://github.com/0xkhan/anker-demo) it uses Git Submodules for
deployment.

# Contributing to Anker <a name="contribution"></a>

First off, thanks a lot for taking the time to read this far and considering to
contribute. If you want to work on this project and make themes for others to use
for free then join this organisation.

#### Why would I want to contribute to Anker?

1. Anker is made by developers for developers. As a developer you're obliged to
   contribute to such projects... Just kidding :smile: it's your choice but if you 
   want to contribute I'd really appreciate it.
2. If you ever wanted to make your own bio link and didn't like other overrated and
   overpriced services then you might want to contribute and distribute your favorite
   theme for free for others to use.
3. Maybe you have better ideas and think that Anker is not executed correctly
   and would want to write better codebase.
4. If you're a beginner to web development you definitely want some light weight
   projects to work on to practice your skills and apply what you've learned.
5. Contributing to Open Source projects is good for later when you start looking for
   job. You can show the recruiters your contribution and it'll win you some
   extra points. Read the [Contributing
Guidelines](https://github.com/ankerapp/anker-app/blob/master/CONTRIBUTING.md)
before contributing!
