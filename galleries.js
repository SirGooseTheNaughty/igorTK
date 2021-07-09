let separator;

const galleries = [
    {
        block: document.querySelector('#rec334064196'),
        title: document.querySelector('#rec334066020'),
    },
    {
        block: document.querySelector('#rec334071710'),
        title: document.querySelector('#rec334071538'),
    },
    {
        block: document.querySelector('#rec334072286'),
        title: document.querySelector('#rec334072001'),
    },
    {
        block: document.querySelector('#rec334072761'),
        title: document.querySelector('#rec334072508'),
    },
    {
        block: document.querySelector('#rec334073679'),
        title: document.querySelector('#rec334073519'),
    },
    {
        block: document.querySelector('#rec334073969'),
        title: document.querySelector('#rec334073737'),
    },
    {
        block: document.querySelector('#rec334074264'),
        title: document.querySelector('#rec334074185'),
    },
];

setTimeout(findElements, 50);

function replaceCardImage (card) {
    const imgElement = card.querySelector('.js-product-img');
    const url = imgElement.getAttribute('data-original');
    imgElement.style.backgroundImage = `url(${url})`;
}

function getCardsData (cards) {
    const cardsData = cards.map(card => {
        const title = card.querySelector('.js-product-name').textContent;
        const floor = shops.find(shop => shop.title === title).floor;

        replaceCardImage(card);
    
        return {
            card,
            floor,
            title
        };
    });
    return cardsData;
}

function findElements () {
    if (!isDataLoaded) {
        console.log('waiting');
        setTimeout(findElements, 50);
        return;
    };
    let isLoaded = true;
    galleries.forEach(gal => {
        gal.cont = gal.block.querySelector('.js-store-grid-cont');
        gal.cards = Array.from(gal.cont.querySelectorAll('.t-store__card'));
        if (!gal.cards.length) {
            isLoaded = false;
        }
    });
    if (!isLoaded) {
        console.log('waiting');
        setTimeout(findElements, 50);
        return;
    }
    separator = document.querySelector('.t-store__grid-separator');
    galleries.forEach(gal => {
        gal.cardsData = getCardsData(gal.cards);
    });
    refillCatalogue();
}

function filterCards (allCards) {
    return allCards.filter(card => card.floor == state.floor);
}

function refillCatalogue () {
    galleries.forEach(gal => {
        gal.cont.innerHTML = '';
        let drawnCards = 0;
        const filteredCards = gal.cardsData.filter(card => card.floor == state.floor);

        if (filteredCards.length) {
            toggleGallery(gal, true)
            filteredCards.forEach(card => {
                drawnCards += 1;
                if (drawnCards > 3) {
                    drawnCards = 0;
                    $(gal.cont).append($(separator).clone());
                }
                $(gal.cont).append(card.card);
            });
        } else {
            toggleGallery(gal, false)
        }
    });
}

function toggleGallery (gal, isVisible) {
    if (isVisible) {
        gal.block.style.display = 'none';
        gal.title.style.display = 'none';
    } else {
        gal.block.style.display = 'block';
        gal.title.style.display = 'block';
    }
}