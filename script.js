const state = {
    floor: 0,
    activeSection: null,
    searchValue: '',
    tooltipTimeout: 0
};

// функции
function filterSearchedShops () {
    if (state.searchValue) {
        return shops.filter(shop => shop.title.toLowerCase().includes(state.searchValue));
    }
    return [];
}

function callTooltip (e) {
    if (!state.activeSection) {
        state.tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 200);
    }
    const shopInfo = shops.find(shop => shop.section == state.activeSection);
    if (!shopInfo) {
        return;
    }
    const { img, title, descr } = shopInfo;
    moveTooltip(e);
    tooltip.pic.setAttribute('src', img || './assets/none.png');
    tooltip.title.textContent = title;
    tooltip.desc.textContent = descr;
    tooltip.block.classList.remove('hidden');
    clearTimeout(state.tooltipTimeout);
}

function moveTooltip (e) {
    tooltip.block.style.top = `${e.layerY}px`;
    tooltip.block.style.left = `${e.layerX + 15}px`;
}

function hideTooltip () {
    state.activeSection = null;
    tooltip.block.classList.add('hidden');
}

function clickCorrespondingCard () {
    const cards = galleries.reduce((acc, gal) => [...acc, ...gal.cardsData], []).filter(card => card.floor === state.floor);
    const shopInfo = shops.find(shop => shop.section == state.activeSection);
    cards.find(card => card.title === shopInfo.title).card.querySelector('a').click();
}

// слушатели событий
function addListeners () {
    floorButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            state.floor = i;
            showCurrentMap();
            hideTooltip();
        })
    });
    
    search.bar.addEventListener('input', function() {
        state.searchValue = this.value.toLowerCase();
        redrawSearchResults();
    });
    
    shopMapItems.forEach(item => {
        if (!item.classList.length) {
            return;
        }
        const section = item.classList[0];
        if (!isNaN(section) || !isNaN(section.split('-')[0])) {
            const isFilledWithData = shops.findIndex(shop => shop.section == section) !== -1;
            if (isFilledWithData) {
                item.classList.add('clickable');
                item.addEventListener('mouseenter', function (e) {
                    state.activeSection = section;
                    callTooltip(e);
                    this.classList.add('highlighted');
                });
                item.addEventListener('mouseleave', function (e) {
                    state.activeSection = null;
                    callTooltip(e);
                    this.classList.remove('highlighted');
                });
                item.addEventListener('mousemove', function (e) {
                    moveTooltip(e);
                });
                item.addEventListener('click', function () {
                    state.activeSection = section;
                    clickCorrespondingCard();
                });
                item.addEventListener('touchend', function () {
                    removeHighlights();
                    this.classList.add('highlighted');
                    state.activeSection = section;
                    clickCorrespondingCard();
                });
            } else {
                item.classList.add('empty');
            }
        }
    });
}

function removeHighlights () {
    mapContainer.querySelectorAll('.highlighted').forEach(elem => elem.classList.remove('highlighted'));
}

function clickSearchResult (data) {
    const { floor, section } = data;
    if (floor !== state.floor) {
        state.floor = floor;
        showCurrentMap();
    }
    const shopElement = mapContainer.getElementsByClassName(section.toString())[0];
    removeHighlights();
    shopElement.classList.add('highlighted');
    state.activeSection = section;
    if ($(window).width() > 480) {
        const rect = shopElement.getClientRects();
        const addHeight = rect.length ? rect[0].height / 2 : 0;
        const addWidth = rect.length ? rect[0].width / 2 : 0;
        callTooltip({
            layerX: $(shopElement).offset().left + addWidth - $(mapContainer).offset().left,
            layerY: $(shopElement).offset().top + addHeight - $(mapContainer).offset().top,
        });
    }
    search.results.innerHTML = '';
    search.bar.value = '';
};

// отрисовщики
function showCurrentMap () {
    maps.forEach((map, i) => {
        if (state.floor === i) {
            map.classList.remove('hidden');
            floorButtons[i].classList.add('active');
        } else {
            map.classList.add('hidden');
            floorButtons[i].classList.remove('active');
        }
    });
    refillCatalogue();
}

function redrawSearchResults () {
    search.results.innerHTML = '';
    if (!state.searchValue) {
        return;
    }
    const filteredShops = filterSearchedShops();
    if (filteredShops.length) {
        filteredShops.forEach(shop => {
            const { img, title, descr } = shop;
            $(search.results).append(searchResultTemplate(img, title, descr));
        });
    } else {
        $(search.results).append(epmtySearchResult);
    }
    search.results.querySelectorAll('.search__result').forEach((res, i) => {
        res.addEventListener('click', () => {
            clickSearchResult(filteredShops[i]);
        });
    });
}

function changePathFillColor (elem, hovered) {
    const color = hovered ? mapColors.hovered : mapColors.std;
    if (elem.nodeName === 'path') {
        elem.setAttribute('fill', color);
    } else {
        elem.querySelectorAll('path').forEach(path => path.setAttribute('fill', color));
    }
}