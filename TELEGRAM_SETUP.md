# Telegram Bot Setup Guide

## 📋 Overview
This guide will help you set up the Telegram bot integration for the RSVP form on your wedding website.

## 🔧 Step-by-Step Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send the command `/newbot`
3. Follow the instructions:
   - Choose a name for your bot (e.g., "Artem & Alena Wedding RSVP")
   - Choose a username for your bot (must end in 'bot', e.g., "artem_alena_wedding_bot")
4. **Save the bot token** that BotFather gives you (it looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Your Chat ID

You need to know where to send the messages. You have two options:

#### Option A: Send to Yourself (Personal Notifications)

1. Search for **@userinfobot** in Telegram
2. Start the bot and it will show your user ID
3. This is your chat ID (e.g., `123456789`)

#### Option B: Create a Group for Both of You

1. Create a new Telegram group with both Artem and Alena
2. Add your newly created bot to the group
3. Send any message in the group
4. Visit this URL in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
5. Look for the `"chat"` object in the response and copy the `"id"` value
   - For groups, it will be a negative number (e.g., `-123456789`)

### 3. Update the Configuration

Open `scripts/main.js` and find the `sendToTelegram` function (around line 200).

Replace these lines:
```javascript
const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your bot token
const CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your chat ID
```

With your actual values:
```javascript
const BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz';
const CHAT_ID = '123456789'; // or '-123456789' for group
```

### 4. Enable the API Call

In the same `sendToTelegram` function, uncomment the fetch code by removing the `/*` and `*/` comments:

```javascript
async function sendToTelegram(message) {
    const BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz';
    const CHAT_ID = '123456789';
    
    // Uncomment this code for production:
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to send message to Telegram');
    }
    
    return response.json();
}
```

## ⚠️ IMPORTANT SECURITY NOTICE

### Current Implementation (Client-Side)
The current setup exposes your bot token in the JavaScript code, which is visible to anyone who views the page source. This is acceptable for a small wedding website but not recommended for production applications.

### Recommended Production Setup (Backend Server)

For better security, create a simple backend endpoint:

**Example with Node.js/Express:**
```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/rsvp', async (req, res) => {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: req.body.message,
            parse_mode: 'Markdown'
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.listen(3000);
```

Then update `main.js` to call your backend:
```javascript
async function sendToTelegram(message) {
    const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
}
```

## 🧪 Testing

1. Fill out the RSVP form on your website
2. Click "Отправить"
3. You should see:
   - Loading modal with "Секунду! Мы сохраняем ваши данные... ⏳"
   - Success modal with personalized message
   - Fireworks animation
   - Calendar buttons
4. Check your Telegram - you should receive a formatted message with all the RSVP details

## 📱 Sample Telegram Message

When someone submits the form, you'll receive a message like:

```
💌 Новый RSVP ответ

👤 Имя: Иван Иванов
📱 Телефон: +7 (999) 123-45-67
✅ Присутствие: Приду
👥 Гостей: 2
🍽️ Еда: Мясо
🏨 Помощь с отелем: Нет
🍷 Напитки: Вино и крепкий алкоголь
💬 Пожелания: Аллергия на орехи

⏰ Время: 15.05.2026, 14:30:00
```

## 🎨 Customization

### Change Colors
Edit the colors array in the `startFireworks()` function in `main.js`:
```javascript
const colors = ['#F8C8D4', '#B8D4EA', '#D4B896', '#E8DDE8', '#FFE4EA'];
```

### Adjust Animation Speed
Modify the particle decay rate:
```javascript
this.decay = Math.random() * 0.015 + 0.01; // Lower = slower fade
```

### Change Explosion Frequency
Adjust the probability in the animate function:
```javascript
if (Math.random() < 0.05) { // Increase for more frequent explosions
```

## ❓ Troubleshooting

### Not receiving messages?
1. Verify the bot token is correct
2. Check the chat ID is correct
3. Make sure the bot is added to the group (if using a group)
4. Check browser console for errors
5. Test the API directly: `https://api.telegram.org/botYOUR_TOKEN/getMe`

### Fireworks not showing?
1. Check browser console for JavaScript errors
2. Ensure the canvas element exists in the HTML
3. Try refreshing the page

### Form not submitting?
1. Check that all required fields are filled
2. Verify phone number format
3. Check browser console for validation errors

## 📞 Support

If you need help setting up the Telegram bot, feel free to reach out or consult the [Telegram Bot API documentation](https://core.telegram.org/bots/api).

---

**Enjoy your special day! 💕**
