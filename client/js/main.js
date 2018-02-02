(function () {
    'use strict';

    const BASE_URL = 'https://node-spider.herokuapp.com';

    // ====

    const techCrunchBtn = document.querySelector('#tech-crunch-button');
    const techTable = document.querySelector('#techcrunch-table');
    const techList = document.querySelector('#techcrunch-list');

    const TECHCRUNCH_URL = `${BASE_URL}/techcrunch`;
    const TECHCRUNCH_RESULT_URL = `${BASE_URL}/techcrunch/result`;

    techCrunchBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        toggleClass(evt.currentTarget);
        getTechCrunchData();
    });

    // ====

    const hcBtn = document.querySelector('#hacker-news-button');
    const hcList = document.querySelector('#hc-list');
    const hcTable = document.querySelector('#hc-table');

    const HC_URL = `${BASE_URL}/hc`;
    const RESULT_URL = `${BASE_URL}/hc/result`;

    hcBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        toggleClass(evt.currentTarget);
        getHackerNewsData();
    });

    // ====

    const toggleClass = (clickedElement) => {
        const elements = document.querySelectorAll('a.mdl-layout__tab');
        elements.forEach(el => el.classList.remove('is-active'));

        clickedElement.classList.add('is-active');
    };

    const getHackerNewsData = () => {
        const request = fetch(HC_URL, {});

        request.then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((data) => buildHackerNewsData())
                    .catch((err) => console.error(err))
            }
        }).catch((err) => console.error(err))
    };

    const buildHackerNewsData = () => {
        const request = fetch(RESULT_URL, {});

        request.then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((data) => displayHackerNewsData(data))
                    .catch((err) => console.error(err))
            }
        }).catch((err) => console.error(err))
    };

    const displayHackerNewsData = (obj) => {
        const { links, author } = obj;

        links.map((link, linkIdx) => link.author = author[linkIdx]);

        const markup = createHackerNewsMarkup(links);
        hcList.innerHTML = markup;

        hcTable.classList.remove('is-hidden');
    };

    const createHackerNewsMarkup = (links) => {
        return links.map(el => `
            <tr>
                <td>
                    <a href="${el.author.url}" target="_blank">
                        ${el.author.name}
                    </a>
                </td>
                <td>${el.author.timestamp}</td>
                <td>${el.description}</td>
                <td>
                    <a target="_blank" href="${el.url}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                        Link
                    </a>
                </td>
            </tr>
        `).join('');
    };

    // ====

    const getTechCrunchData = () => {
        const request = fetch(TECHCRUNCH_URL, {});

        request.then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((data) => buildTechCrunchData())
                    .catch((err) => console.error(err))
            }
        }).catch((err) => console.error(err))
    };

    const buildTechCrunchData = () => {
        const request = fetch(TECHCRUNCH_RESULT_URL, {});

        request.then((data) => {
            if (data.status === 200) {
                data.json()
                    .then((data) => displayTechCrunchData(data))
                    .catch((err) => console.error(err))
            }
        }).catch((err) => console.error(err))
    };

    const displayTechCrunchData = (obj) => {
        const { posts, entry } = obj;

        const markup = createTechCrunchMarkup(posts);
        techList.innerHTML = markup;

        techTable.classList.remove('is-hidden');
    };

    const createTechCrunchMarkup = (posts) => {
        return posts.map(el => `
            <tr>
                <td>
                    <a target="_blank" href="${el.author.url}">
                        ${el.author.name}
                    </a>
                </td>
                <td>${el.timestamp}</td>
                <td>${el.title}</td>
                <td>
                    <a target="_blank" href="${el.url}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                        Link
                    </a>
                </td>
            </tr>
        `).join('');
    };
})();
