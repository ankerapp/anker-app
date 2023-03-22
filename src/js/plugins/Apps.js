class Apps {

    /** Markup for YouTube vide embeds */
    _appYouTube(link) {
        return `
            <div style="width: 100%; height: 100%;">
                <iframe width="100%" height="350" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        `;
    }

}

export default new Apps();
