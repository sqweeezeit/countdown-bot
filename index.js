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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
cron.schedule('0 16 * * *', async () => {
    const daysLeft = getRemainingDays(TARGET_DATE);
    const message = `До ${TARGET_DATE.toDateString()} осталось ${daysLeft} дней.`;
    await sendMessage(message);
}, {
    timezone: 'Asia/Almaty'
});

cron.schedule('2 16 * * *', async () => {
    const daysLeft = getRemainingDays(TARGET_DATE);
    const message = 'Че там, @konurovjunior, летишь?';
    await sendMessage(message);
}, {
    timezone: 'Asia/Almaty'
});

const daysLeft = getRemainingDays(TARGET_DATE);
sendMessage(`До ${TARGET_DATE.toDateString()} осталось ${daysLeft} дней.`);

console.log('Скрипт запущен. Ожидаем 10:00 каждый день...');
