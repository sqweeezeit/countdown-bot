const fetch = require('node-fetch');
const cron = require('node-cron');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

// Замените эти значения своими
const TARGET_DATE = new Date('2025-07-06'); // Дата, до которой считаем

function getRemainingDays(target) {
    const now = new Date();
    const diffTime = target - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
}

async function sendMessage(text) {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: process.env.CHAT_ID,
            text,
        }),
    });
}

// Планируем запуск каждый день в 10:00 утра
cron.schedule('0 10 * * *', async () => {
    const daysLeft = getRemainingDays(TARGET_DATE);
    const message = `До ${TARGET_DATE.toDateString()} осталось ${daysLeft} дней.`;
    await sendMessage(message);
}, {
    timezone: 'Asia/Almaty'
});

cron.schedule('30 16 * * *', async () => {
    const message = 'Че там, @konurovjunior, летишь?';
    await sendMessage(message);
}, {
    timezone: 'Asia/Almaty'
});

const phuketCoffeeshops = [
    {
        name: "Phuket Cannabis Café",
        location: "Patong (OTOP Market)",
        description: "Лаунж с широким выбором сортов, работает до 3 ночи.",
        url: "https://www.phuketcannabiscafe.com/"
    },
    {
        name: "Phuket Cannabis Dispensary",
        location: "Patong, Nanai Road 90/2",
        description: "Более 100 сортов, лаунж с бесплатными бонгами, импортные и местные сорта.",
        url: "https://www.patong-cannabis.com/"
    },
    {
        name: "Cannabis Café & Restaurant",
        location: "Rawai",
        description: "Кафе с лаунжем, едой, напитками и ассортиментом каннабиса.",
        url: "https://thaiweedguide.com/directory-dispensaries/listing/cannabis-cafe-restaurant-phuket/"
    },
    {
        name: "CANNA Cafe’@Phuket",
        location: "Phuket Town",
        description: "Кафе с музыкой, напитками, прокатом велосипедов и премиальными сортами.",
        url: "https://thai.news/news/thailand/top-20-cannabis-shops-where-to-buy-weed-in-phuket-vol-1-2024"
    },
    {
        name: "Mr. Weed Phuket",
        location: "Surin Beach",
        description: "Лаунж с премиальными цветами, съедобными продуктами и аксессуарами.",
        url: "https://mrweedphuket.com/"
    },
    {
        name: "Daddy’s Dispensary & Lounge",
        location: "Sakhu (рядом с аэропортом)",
        description: "Кофе, лаунж и топовые сорта рядом с аэропортом.",
        url: "https://www.tripadvisor.com/Attraction_Review-g2315813-d25684995-Reviews-Daddy_s_Dispensary_Lounge_Phuket-Sakhu_Thalang_District_Phuket.html"
    },
    {
        name: "The Phuket Cannabis Club",
        location: "Patong",
        description: "Клуб с лаунжем и ассортиментом каннабиса.",
        url: "https://www.tripadvisor.com/Attraction_Review-g297930-d25272773-Reviews-The_Phuket_Cannabis_Club_Patong-Patong_Kathu_Phuket.html"
    },
    {
        name: "Smokey Monkey Cannabis Café",
        location: "Phuket",
        description: "Кафе с каннабисом и лаунжем.",
        url: "https://www.instagram.com/p/DAYAJMLyhp8/"
    },
    {
        name: "Baloo’s Coffeeshop",
        location: "Patong",
        description: "Первый легальный кофешоп в Патонге с лаунжем.",
        url: "https://www.facebook.com/baloosbarphuket/"
    },
    {
        name: "King Kush",
        location: "Patong",
        description: "24/7 лаунж с PlayStation 5 и импортными сортами.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "WeedeN",
        location: "Boat Avenue, Rawai",
        description: "Сеть из 20 магазинов с премиальными сортами и CBD-продуктами.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "High Dood Cannabis",
        location: "Cherng Talay",
        description: "Кафе-лаунж с 15-18 сортами, кофе и бесплатными бонгами.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "Phuket High",
        location: "Nai Harn, Rawai",
        description: "Сеть с тремя точками, лаунжем и эксклюзивными сортами.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "Cosmic Temple Vibes",
        location: "Rawai",
        description: "Духовное пространство с лаунжем и собственными сортами.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "Green High",
        location: "Wichit",
        description: "Лаунж с бильярдом, напитками и дружелюбной атмосферой.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "GrowLand Phuket",
        location: "Rawai",
        description: "Магазин с товарами для выращивания и лаунжем.",
        url: "https://aseannow.com/topic/1350204-best-cannabis-stores-in-phuket-2025/"
    },
    {
        name: "Juicy Buds Patong",
        location: "Patong",
        description: "Лаунж с премиальными сортами и уютной атмосферой.",
        url: "https://juicybudsthailand.com/"
    },
    {
        name: "Juicy Buds Kata",
        location: "Kata Beach",
        description: "Магазин с широким выбором сортов и лаунжем.",
        url: "https://juicybudsthailand.com/"
    },
    {
        name: "Ducky Kush",
        location: "Phuket",
        description: "Диспенсер с цветами, прероллами и аксессуарами.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "Green House Rawai",
        location: "Rawai",
        description: "Диспенсер с цветами, съедобными продуктами и CBD.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "BAKED Naiharn",
        location: "Nai Harn",
        description: "Кафе с цветами, съедобными продуктами и лаунжем.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "Aleaf Patong",
        location: "Patong",
        description: "Кафе с цветами, CBD и аксессуарами.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "Grifterz Cannabis Lounge",
        location: "Phuket",
        description: "Лаунж с цветами, съедобными продуктами и аксессуарами.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "Green Ghost",
        location: "Phuket",
        description: "Диспенсер с цветами, съедобными продуктами и CBD.",
        url: "https://thaiweedguide.com/all-posts/best-dispensaries-in-phuket/"
    },
    {
        name: "Four Twenty",
        location: "Phuket",
        description: "Диспенсер с уникальной атмосферой и ассортиментом.",
        url: "https://cannabox.co.th/learn/post/where-to-buy-weed-in-phuket-top-10-cannabis-dispensaries"
    },
    {
        name: "Tree Kings OG",
        location: "Phuket",
        description: "Магазин с широким выбором сортов и аксессуаров.",
        url: "https://www.pca.or.th/member.php"
    },
    {
        name: "Blackbird Phuket Cannabis",
        location: "Phuket",
        description: "Диспенсер с цветами и аксессуарами.",
        url: "https://www.pca.or.th/member.php"
    },
    {
        name: "Hemton Dispensary",
        location: "Phuket",
        description: "Сеть диспенсеров с цветами и CBD-продуктами.",
        url: "https://www.pca.or.th/member.php"
    },
    {
        name: "Kulture Growshop",
        location: "Phuket",
        description: "Магазин с товарами для выращивания каннабиса.",
        url: "https://www.pca.or.th/member.php"
    },
    {
        name: "Green Lab",
        location: "Phuket",
        description: "Диспенсер с цветами и аксессуарами.",
        url: "https://www.pca.or.th/member.php"
    }
];

let pointer = 0;

const sendShop = () => {
    if (pointer !== phuketCoffeeshops.length - 1) {
        pointer = pointer + 1;
    } else {
        pointer = 0;
    }
    const currentShop = phuketCoffeeshops[pointer];
    return `Предлагаю вам посетить прекрасный ${currentShop.name} в ` +
        `${currentShop.location}, ведь это ${currentShop.description}.` +
        `Подробнее можно почитать в ${currentShop.url}.`;
}

sendMessage(sendShop());

cron.schedule('00 11 * * *', async () => {
    const message = sendShop();
    await sendMessage(message);
}, {
    timezone: 'Asia/Almaty'
});

console.log('Скрипт запущен. Ожидаем 10:00 каждый день...');
