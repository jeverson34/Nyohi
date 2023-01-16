const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Color } = require("../../config.js");

module.exports = {
  name: 'advice',
  aliases: [ 'tips', 'advise' ],
  group: 'fun',
  description: 'Gere um conselho aleatório inútil',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'advice',
    'tips',
    'advise'
  ],
  run: async (client, message) => {

    const data = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Advice API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setTitle(data.slip.advice)
    );
  }
};
