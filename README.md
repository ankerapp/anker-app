# Anker
Anker is a very light weight template for social media bio links like Linktree. 
The template is very little SASS and JS code that anybody can change in few 
minutes. With Anker you can make Landing Pages super fast and super easy.

>:warning: &nbsp; Disclaimer: I wrote the whole thing in an afternoon so the
code is not very sophisticated. So if you have any suggestions feel free to
let me know.

# Table of contents
1. [Demo](#demo)
2. [Why not just use Linktree or similar apps?](#why-anker)
3. [The Codebase](#codebase)
4. [How do I make my own themes](#how)
    * [Get the source code](#get-source-code)
    * [The SASS files](#sass-files)
    * [The theme file](#theme-file)
    * [The JSON file](#json-file)
5. [I want more customization](#more-customization)
    * [The JS file](#js-file)
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
   Gumtree or something. This however is not the motivation behind Anker but it
   certainly is a possibility.
7. As developers we have our own domain names and can design better landing
   pages. it's always better to have `john.com/bio` than `linktr.ee/john` or
   `bio.site/john`.

Finally, you can now make your own bio links/ landing pages for free in a matter of
minutes.

### The Codebase <a name="codebase"></a>
The whole template is made up of some SASS files and one JS file and the data is
served from a JSON file. Why JSON file you ask? Well, we only have to store a
few links it's unnecessary to create a database for that. Also I wanted to keep
it very simple so anybody who wants to customize it doesn't have to go through
the pain of setting up the back-end, API or other unnecessary complex things.
The JSON file can either be stored locally or served from somewhere else ideally
raw JSON from GitHub. The only problem with reading raw data from GitHub is that
it might be slower than reading from local file.

The best option however is Netlify. Netlify's starter plan allows you host your
data/website for free. You can host both your `data.json` file and profile
picture. The best part is that your data is hosted on their CDN so it's 
super fast. [Netlify
Solution](https://github.com/ankerapp/anker-app#how-to-host-your-json-file-on-netlify)

# How do I make my own theme <a name="how"></a>

### Get the source code <a name="get-source-code"></a>
First, clone this repo. Run `npm install` to install all the dependencies.
After the dependencies are installed run `npm run start` to watch for changes
and start a live server. Now you want to navigate to `sass/` directory and
start customizing. Make sure you manually copy `data.json` to `dist/` directory.

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
│   └── _typography.scss
├── layout
│   ├── _body.scss
│   ├── _footer.scss
│   └── _header.scss
├── main.scss
└── themes
    ├── _classic-dark.scss
    ├── _classic-light.scss
    ├── _modern-dark.scss
    └── _modern-light.scss
```

### The theme file <a name="theme-file"></a>
The file tree above shows a directory called `themes/` with some themes inside.
Those are your theme files you can create as many themes you want. There isn't
much to be changed. The whole template has a background, profile picture, name
and the links. Inside your theme file you can change all those things. See the
code below:

```sass
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

Before you start customizing add your theme file to `main.scss` file so it can
be compiled for use. You only have to add the theme you want to use not all of
them if you have more than one. Also copy `data.json` file to your dist so you
have data to test during development. Unfortunately you have to copy it manually
and ideally you wanna do it after you run `npm run start`.

See the content of `main.scss` file below:

```sass
@use 'base/base';
@use 'base/grid';
@use 'base/typography';

@use 'layout/header';
@use 'layout/body';
@use 'layout/footer';

// This is where you use your theme
@use 'themes/modern-light';
```

* For the `background` you can have whatever you want simple one color, gradient,
gradient mesh, image, video etc.
* The `.logo` class sets the fill property of the Anker logo in footer. The
    logo has to be in the footer.
* The `.link` class is the one you want to change. You can add hover effects to 
    it, animation or even make it drop-down to show some content. Of course you
    might want to add some JS to `index.js` file if required.
* For the `social-link` you also don't have to do much except for the color. if
    the color is the same as the primary color you can just inherit it from
    parent element.

And that's it you now have your own theme. But wait you have to link your
JSON file. If you want to serve the JSON file locally then add your links to
`data.json` file and `npm run build` will copy it to `dist/` directory.
Otherwise you can serve it from somewhere else.

> **Note:** `npm run build` will not copy the `data.json` file on windows. You
might wanna copy it manually.

### The JSON File <a name="json-file"></a>
The JSON file is very straight forward. `name` is your name you want to show.
`links` are the links that are listed on your bio. Instead of `Link One, Link
Two` etc. you want to give them real names like `My Portfolio` or `My New Book`.
The `social` is obviously your social links object.
```json
{
    "name": "John Doe",

    "profilePic": "<netlify-subdomain>.netlify.app/profile.jpg",

    "links": {
        "Link One": "https://link.com/",
        "Link Two": "https://link.com",
        "Link Three": "https://link.com",
        "Link Four": "https://link.com",
        "Link Five": "https://link.com",
        "Link Six": "https://link.com",
        "Link Seven": "https://link.com"
    },

    "social": {
        "github": "https://github.com/<your github username>",
        "dribbble": "https://dribbble.com/<your dribbble username>",
        "twitter": "https://twitter.com/<your twitter username>",
        "instagram": "https://instagram.com/<your instagram username>"
    }
}
```

After you're finished with everything just build the project by running `npm run
build`. Now you can take your `dist/` directory and host it on your server. See
the Netlify solution below.

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
### The JS File <a name="js-file"></a>
```javascript
import './sass/main.scss'
import './assets/tabler-sprite.svg'
import profilePic from './assets/profile.jpg'

fetch('https://ankerdata.netlify.app/data.json')
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(err => console.log(err));

function renderData(data) {
    const profileImage = document.getElementById('header__image');
    const userName = document.querySelector('.header__username');
    const linksContainer = document.querySelector('.links');
    const socialLinksContainer = document.querySelector('.social-links');

    profileImage.src = data.profilePic;
    userName.innerText = data.name;

    // Fallback for profile picture
    profileImage.addEventListener('error', () => {
        profileImage.src = profilePic;
    });

    for (const key in data.links) {
        linksContainer.insertAdjacentHTML(
            'beforeend',
            `<li class="link-item"><a class="link" href="${data.links[key]}">${key}</a></li>`
        );
    }

    for (const key in data.social) {
        socialLinksContainer.insertAdjacentHTML(
            'beforeend',
            `<li class="social-link-item">
                <a class="social-link" href="${data.social[key]}">
                    <svg class="social-icon">
                        <use href="./assets/tabler-sprite.svg#tabler-brand-${key}"/>
                    </svg>
                </a>
            </li>`
        );
    }
}
```

The first part is some `imports`. The `tabler-sprite.svg` is for social icons. 
The `profile.jpg` is the profile picture. It's imported here because of Webpack 
so it moves it to `dist/` folder.
```javascript
import './sass/main.scss'
import './assets/tabler-sprite.svg'
import profilePic from './assets/profile.jpg'
```

In the second block of code the JSON file is fetched. This is where you want to 
link your JSON file. Don't change it if your JSON file is served locally. You 
only have to make sure that it's copied to your `dist/` directory.
```javascript
fetch('data.json')
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(err => console.log(err));
```

> **Note:** If you want to serve the JSON file from somewhere else then you have to make
sure that you set the correct `fetch()` parameters and take care of CORS.

Code example below shows how would it look if your JSON file is hosted somewhere
else:
```javascript
    fetch('http://example.com/data.json', {
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(err => console.log(err));
```

Read more about `fetch()` parameters 
[here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options).

If you use Netlify as shown above then of course you want to use your Netlify
link:
```javascript
fetch('https://<your-netlify-subdomain>.netlify.app/data.json')
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(err => console.log(err));
```

The third block of code renders processed data from JSON file. You don't have to
touch this block of code unless you really have to. The reason you might want to 
change this block of code if you don't want the social icons or you want your
links to have drop-down content or want some widgets e.g. embedding video, Fundme
widget, buymeacoffee etc.

> **Note:** You don't have to have separate CSS and JS files. You can merge Ankers
CSS and JS files with your own after bundling or bundle it with your main
CSS and JS code.

### Deployment <a name="deployment"></a>
How do you wanna deploy it is up to you. If you want to use Anker as your
landing page then by all means do that but if you already have a website and
wanna use Anker as a bio link to have a link like: `example.com/bio` then
nothing is stopping you from that as well.

If you already have a website then I'd suggest you to merge the code with
your CSS and JS and you'll be fine. However if you want to use Anker on it's
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
   extra points.
