// server.js
const express = require('express');
const { Telegraf } = require('telegraf');
const bot = require('./bot'); // Import your bot logic from bot.js
const app = express();

const PORT = process.env.PORT || 3000;
// Set up webhook endpoint for Telegram bot
const webhookEndpoint = encodeURIComponent(process.env.RANDO);
 // Replace with your desired endpoint

app.use(bot.webhookCallback(webhookEndpoint));

// Handle incoming requests to the webhook endpoint
app.post(webhookEndpoint, (req, res) => {
  // The `handleUpdate` method will process incoming Telegram updates
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start the bot
bot.launch();


