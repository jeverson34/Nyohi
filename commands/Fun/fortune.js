const { MessageEmbed } = require('discord.js');
const fortunes = require('../../assets/json/fortune.json');
const { Color } = require("../../config.js");

module.exports = {
  name: 'fortune',
  aliases: [ 'ft', 'fortunecookies', 'fortunecookie' ],
  group: 'fun',
  description: 'Gere uma fortuna aleatória',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'fortune',
    'ft',
    'fortunecookies',
    'fortunecookie'
  ],
  run: (client, message) => message.channel.send(
    new MessageEmbed()
    .setColor(Color)
    .setAuthor(message.author.tag)
    .setDescription(fortunes[Math.floor(Math.random() * fortunes.length)])
  )
};
