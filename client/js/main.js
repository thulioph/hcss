(function() {
    'use strict';

    const hcBtn = document.querySelector('#hacker-news-button');
    const hcList = document.querySelector('#hc-list');
    const hcTable = document.querySelector('#hc-table');

    const HC_URL = 'http://localhost:3000/hc';
    const RESULT_URL = 'http://localhost:3000/hc/result';

    // ====

    hcBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        toggleClass(evt.currentTarget);
        getHackerNewsData()
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
})();
