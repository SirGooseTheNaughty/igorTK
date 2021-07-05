const state = {
    floor: 1,
    activeSection: null,
    searchValue: '',
    tooltipTimeout: 0
};

// функции
function filterSearchedShops () {
    if (state.searchValue) {
        return shops.filter(shop => shop.name.toLowerCase().includes(state.searchValue));
    }
    return [];
}

function callTooltip (e) {
    if (!state.activeSection) {
        // tooltip.block.classList.add('hidden');
        state.tooltipTimeout = setTimeout(() => {
            state.activeSection = null;
            tooltip.block.classList.add('hidden');
        }, 1000);
    }
    const shopInfo = shops.find(shop => shop.section == state.activeSection);
    console.log(shopInfo);
    if (!shopInfo) {
        return;
    }
    console.log(e);
    const { img, name, desc } = shopInfo;
    tooltip.block.style.top = `${e.layerY}px`;
    tooltip.block.style.left = `${e.layerX}px`;
    tooltip.pic.setAttribute('src', img || './assets/none.png');
    tooltip.title.textContent = name;
    tooltip.desc.textContent = desc;
    tooltip.block.classList.remove('hidden');
    clearTimeout(state.tooltipTimeout);
}

// слушатели событий
floorButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        state.floor = i;
        showCurrentMap();
    })
});

searchBar.addEventListener('input', function() {
    state.searchValue = this.value.toLowerCase();
    redrawSearchResults();
});

shopMapItems.forEach(item => {
    if (!item.classList.length) {
        return;
    }
    const section = item.classList[0];
    if (!isNaN(section) || !isNaN(section.split('-')[0])) {
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
    }
});
tooltip.block.addEventListener('mouseenter', () => {
    clearTimeout(state.tooltipTimeout);
});
tooltip.block.addEventListener('mouseleave', (e) => {
    state.activeSection = null;
    callTooltip(e);
});

function clickSearchResult (data) {
    const { section } = data;
    const shopElement = mapContainer.getElementsByClassName(section.toString())[0];
    shopElement.classList.add('highlighted');
    state.activeSection = section;
    callTooltip({
        layerX: $(shopElement).offset().left - $(mapContainer).offset().left,
        layerY: $(shopElement).offset().top,
    });
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
}

function redrawSearchResults () {
    searchResults.innerHTML = '';
    if (!state.searchValue) {
        return;
    }
    const filteredShops = filterSearchedShops();
    if (filteredShops.length) {
        filteredShops.forEach(shop => {
            const { img, name, desc } = shop;
            $(searchResults).append(searchResultTemplate(img, name, desc));
        });
    } else {
        $(searchResults).append(epmtySearchResult);
    }
    searchResults.querySelectorAll('.search__result').forEach((res, i) => {
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