const mapBlock = document.querySelector('.mapBlock');
const searchBar = mapBlock.querySelector('.search__bar');
const searchResults = mapBlock.querySelector('.search__results');
const searchBlock = mapBlock.querySelector('.search');
const floorsBlock = mapBlock.querySelector('.floors');
const mapContainer = mapBlock.querySelector('.map');

const floorButtons = Array.from(mapBlock.querySelectorAll('.floor'));

const tooltip = {
    block: mapBlock.querySelector('.tooltip'),
    pic: mapBlock.querySelector('.tooltip__pic'),
    title: mapBlock.querySelector('.tooltip__title'),
    desc: mapBlock.querySelector('.tooltip__description')
};

const searchResultTemplate = (url = './assets/none.png', title, desc) => {
    return (`
        <div class="search__result">
            <img class="search__resultPic" src="${url}" alt="shop icon">
            <div class="search__resultTitle">${title}</div>
            <div class="search__resultDescription">${desc}</div>
        </div>
    `);
};
const epmtySearchResult = '<div class="search__resultEmpty">По вашему запросу не нашлось магазинов</div>';