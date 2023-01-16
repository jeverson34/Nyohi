const Discord = require('discord.js')
const c = require('../../config.json')

module.exports = {
  name: "reverse",
  aliases: [""],
  category: "fun",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    try {
      if (!args[0]) return message.reply('Você precisa inserir o texto para reverter!');
      
      const str = args.join(' ');
      let msg = await message.reply(str.split('').reverse().join(''));
      msg.react('🔁');
      message.delete().catch(O_o => {});
    } catch (err) {
      message.channel.send('Aconteceu um erro!\n' + err).catch();
    }
  }
};