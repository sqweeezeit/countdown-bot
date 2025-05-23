const fetch = require('node-fetch');
const express = require('express');
const { CronJob } = require('cron');
const bodyParser = require('body-parser');
const app = express();

if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.CHAT_ID) {
    console.error('❌ TELEGRAM_BOT_TOKEN или CHAT_ID не установлены');
    process.exit(1);
}

// 🎯 Целевая дата
const TARGET_DATE = new Date('2025-06-22');

// 📅 Подсчёт оставшихся дней
function getRemainingDays(target) {
    const now = new Date();
    const diffTime = target - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
}

function formatTimeDifference(targetDate) {
    const now = new Date();
    const diffMs = targetDate - now;

    if (diffMs <= 0) return 'Время вышло';

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(diffMinutes / (60 * 24));
    const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
    const minutes = diffMinutes % 60;

    return `${days} дней ${hours} часов ${minutes} минут`;
}

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Bot is alive');
});
app.listen(PORT, () => {
    console.log(`✅ Express server listening on port ${PORT}`);
});
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const message = req.body.message;

    if (!message || !message.text) return res.sendStatus(200);

    const chat_id = message.chat.id;
    const text = message.text.trim();

    if (text === '/left') {
        const days = formatTimeDifference(TARGET_DATE);
        await sendMessage(chat_id, `🕒 До ${TARGET_DATE.toDateString()} осталось ${days}.`);
    }

    res.sendStatus(200);
});

// 📤 Отправка сообщений
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

// 📋 Список заведений
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

let pointer = 2;
function sendShop() {
    if (pointer !== phuketCoffeeshops.length - 1) {
        pointer += 1;
    } else {
        pointer = 0;
    }
    const current = phuketCoffeeshops[pointer];
    return `Предлагаю вам посетить прекрасный ${current.name} в ${current.location}, ` +
        `ведь это ${current.description}. Подробнее: ${current.url}`;
}

// 🕘 Cron: каждый день в 10:00
new CronJob('0 0 10 * * *', async () => {
    const daysLeft = getRemainingDays(TARGET_DATE);
    const message = `До ${TARGET_DATE.toDateString()} осталось ${daysLeft} дней.`;
    console.log('[10:00] Отправка дня:', message);
    await sendMessage(message);
}, null, true, 'Asia/Almaty');

// 🕓 Cron: каждый день в 16:30
new CronJob('0 30 16 * * *', async () => {
    const message = 'Че там, @konurovjunior, летишь?';
    console.log('[16:30] Проверка полета');
    await sendMessage(message);
}, null, true, 'Asia/Almaty');

// 🕚 Cron: каждый день в 11:00 — предложить кофешоп
new CronJob('0 00 19 * * *', async () => {
    const message = sendShop();
    console.log('[19:00] Предложение кофешопа');
    await sendMessage(message);
}, null, true, 'Asia/Almaty');


console.log('🚀 Скрипт запущен. Ожидаем события...');

const now = new Date();
const formatted = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Almaty',
    dateStyle: 'full',
    timeStyle: 'long'
}).format(now);

console.log(`🕒 Время в Asia/Almaty: ${formatted}`);

