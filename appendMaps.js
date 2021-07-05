floorMaps.forEach((map, i) => {
    $(mapContainer).append(map);
});

const maps = mapContainer.querySelectorAll('svg');
maps.forEach((map, i) => {
    if (i) {
        map.classList.add('hidden');
    }
});

const shopMapItems = mapContainer.querySelectorAll('path, g');