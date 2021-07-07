const mapBlock = document.querySelector('.mapBlock');
const floorsBlock = mapBlock.querySelector('.floors');
const mapContainer = mapBlock.querySelector('.map');

const floorButtons = Array.from(mapBlock.querySelectorAll('.floor'));

const search = {
    block: mapBlock.querySelector('.search'),
    bar: mapBlock.querySelector('.search__bar'),
    results: mapBlock.querySelector('.search__results'),
};
search.bar.value = '';
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

const mapColors = {
    std: '#9B9B9B',
    hovered: '#00A2D1'
};