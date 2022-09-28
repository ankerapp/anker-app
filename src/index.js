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
