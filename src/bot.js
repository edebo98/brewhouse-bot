require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error('ERROR: TELEGRAM_TOKEN is not set');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const MENU = `
☕ *Brew House Menu*

*Hot drinks*
- Espresso — $3.00
- Flat White — $4.50
- Latte — $4.00
- Cappuccino — $4.00

*Cold drinks*
- Iced Coffee — $4.50
- Cold Brew — $5.00
- Iced Matcha — $5.50

*Food*
- Croissant — $3.50
- Banana bread — $3.00
- Blueberry muffin — $3.50
`;

const HOURS = `
🕐 *Opening Hours*

Mon–Fri:  7am – 6pm
Saturday: 8am – 5pm
Sunday:   9am – 4pm

Public holidays: 10am – 3pm
`;

const LOCATION = `
📍 *Find Us*

123 Bean Street, Halifax, NS
Near the central library.
Free parking on weekends.

Google Maps: maps.google.com/?q=Brew+House+Halifax
`;

const greeting = (name) => `
Hey ${name}! 👋 Welcome to *Brew House Coffee*.

I'm your virtual support assistant. Here's what I can help you with:

/menu — See our full menu & prices
/hours — Opening hours
/location — How to find us
/order — Place an order
/complaint — Report an issue
/human — Speak to a real person
`;

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'there';
  bot.sendMessage(msg.chat.id, greeting(name), {
    parse_mode: 'Markdown'
  });
});

bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, MENU, { parse_mode: 'Markdown' });
});

bot.onText(/\/hours/, (msg) => {
  bot.sendMessage(msg.chat.id, HOURS, { parse_mode: 'Markdown' });
});

bot.onText(/\/location/, (msg) => {
  bot.sendMessage(msg.chat.id, LOCATION, { parse_mode: 'Markdown' });
});

bot.onText(/\/order/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '📝 To place an order call us or visit in store:\n\n📞 *+1 902 555 0198*\n\nOnline ordering coming soon!',
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/complaint/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `😔 We're really sorry to hear that.\n\nPlease describe your issue by replying to this message and a manager will follow up within 24 hours.\n\nOr email us directly: *support@brewhouse.com*`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/human/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `👤 *Connecting you to our team...*\n\n📞 Call: *+1 902 555 0198*\n📧 Email: *hello@brewhouse.com*\n\nAvailable during opening hours.`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('message', (msg) => {
  const text = msg.text || '';
  if (!text.startsWith('/')) {
    bot.sendMessage(msg.chat.id,
      `I didn't quite get that. Here are my commands:\n\n/menu /hours /location /order /complaint /human`
    );
  }
});

console.log('Brew House bot is running...');
module.exports = bot;