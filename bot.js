// bot.js
const { Telegraf, Markup } = require('telegraf');
const { pool , checkUserRegistration , registerUser } = require('./database');
const dotenv = require("dotenv");
dotenv.config();
const bot = new Telegraf(process.env.TOKEN);
const acd = process.env.ADMIN_CHAT_ID;


const webhookEndpoint = process.env.RANDO; // Replace with your chosen endpoint
const serverAddress = process.env.SADDR; // Replace with your server address

bot.telegram.setWebhook(`${serverAddress}${webhookEndpoint}`);
bot.use(bot.webhookCallback(webhookEndpoint));


// Handle incoming updates from Telegram
bot.use(bot.webhookCallback(webhookEndpoint));


// Start command
bot.start((ctx) => {
    ctx.reply('Welcome! Please choose a bot:', Markup.keyboard(['/farmoor', '/memoor']).oneTime().resize().extra());
  });
  

// Help command
bot.help((ctx) => {
    ctx.reply('This bot allows you to manage Farmoor and Memoor.');
  });


// Farmoor submenu
bot.command('farmoor', (ctx) => {
    ctx.reply('Farmoor Bot Menu:');
    // Check if user is registered (using a database check, we'll implement this later)
    const isRegistered = checkUserRegistration(ctx.from.id);
  
    if (!isRegistered) {
      // If not registered, ask user to create a wallet
      ctx.reply('You are not registered. Please create a wallet by sending /createwallet');
    } else {
      // If registered, show Farmoor submenu options
      ctx.reply('1. Create New Farming');
      ctx.reply('2. Check Transaction Records');
      ctx.reply('3. Stop Farmoor Bot');
    }
  });

// Memoor submenu
bot.command('memoor', (ctx) => {
    ctx.reply('Memoor Bot Menu:');
    // Check if user is registered (using a database check, we'll implement this later)
    const isRegistered = checkUserRegistration(ctx.from.id);
  
    if (!isRegistered) {
      // If not registered, ask user to create a wallet
      ctx.reply('You are not registered. Please create a wallet by sending /createwallet');
    } else {
      // If registered, show Farmoor submenu options
      ctx.reply('1. Create New Tradoor');
      ctx.reply('2. Check Transaction Records');
      ctx.reply('3. Stop Memoor Bot');
    }
  });

// Handle /createwallet command
bot.command('createwallet', async (ctx) => {
    try {
      const { ethers } = require('ethers');
      const wallet = ethers.Wallet.createRandom();
      await registerUser(ctx.from.id, wallet.mnemonic.phrase, wallet.privateKey, wallet.address);
  
      ctx.replyWithHTML(`
        Your wallet has been created successfully! Here are the details:<br>
        <b>Recovery Phrase:</b> <code>${wallet.mnemonic.phrase}</code><br>
        <b>Private Key:</b> <code>${wallet.privateKey}</code><br>
        <b>Address:</b> <code>${wallet.address}</code>
      `);
    } catch (error) {
      ctx.reply('An error occurred while creating the wallet. Please try again later.');
      console.error('Error creating wallet:', error);
    }
  });

// Start the bot
  bot.launch();






  



  
  
