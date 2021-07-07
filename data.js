let shops;

const rawShops = [
    {
        title: 'Familia',
        descr: 'Магазин всякой всячины со скидками',
        characteristics: [
            { title: "section", value: "230" }
        ],
        gallery: "[{\"img\":\".\\/assets\\/familia.png\"}]",
        insta: 'https://www.instagram.com/detkishop_com/',
        vk: 'https://vk.com/detki',
        site: 'https://detkishop.com/'
    },
    {
        title: 'ЗооОптТорг',
        descr: 'Товары для животинок',
        characteristics: [
            { title: "section", value: "301" }
        ],
        gallery: "[{\"img\":\".\\/assets\\/zooopttorg.png\"}]",
        insta: '',
        vk: '',
        site: ''
    },
    {
        title: 'Макдональдс',
        descr: 'Чисто пожракать',
        characteristics: [
            { title: "section", value: "103" }
        ],
        gallery: "[{\"img\":\".\\/assets\\/mac.png\"}]",
        insta: '',
        vk: '',
        site: ''
    }
];

function preformShopData (rawData) {
    return rawData.map(data => {
        data.section = data.characteristics[0].value;
        data.floor = parseInt(data.section.split('')[0]) - 1;
        data.img = data.gallery ? JSON.parse(data.gallery)[0].img : 'https://static.tildacdn.com/tild6234-3434-4066-a362-393731373634/none.png';
        return data;
    });
}

shops = preformShopData(rawShops);