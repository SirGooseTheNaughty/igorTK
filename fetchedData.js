let shops;
let isDataLoaded = false;

async function fetchData () {
    const res = await fetch("https://store.tildacdn.com/api/getproductslist/?storepartuid=931199365671&recid=333721995&c=1625661388188&getparts=true&getoptions=true&slice=1&size=100", {
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        "method": "GET"
    });
    return res.json();
}

async function getShops () {
    const res = await fetchData();
    shops = preformShopData(res.products);
    isDataLoaded = true;
    addListeners();
}

function preformShopData (rawData) {
    return rawData.map(data => {
        if (!data.characteristics || !data.characteristics[0]) {
            return null;
        }
        if (data.title.includes('&amp;')) {
            data.title = data.title.split('&amp;').join('&');
        }
        data.section = data.characteristics[0].value;
        data.floor = parseInt(data.section.split('')[0]) - 1;
        data.img = data.gallery ? JSON.parse(data.gallery)[0].img : 'https://static.tildacdn.com/tild6234-3434-4066-a362-393731373634/none.png';
        return data;
    })
    .filter(data => data);
}

getShops();