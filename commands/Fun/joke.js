const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Color } = require("../../config.js");

module.exports = {
  name: 'joke',
  aliases: [ 'haha' ],
  group: 'fun',
  description: 'Gerar uma piada aleatória de uma API de piada',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'joke',
    'haha'
  ],
  run: async (client, message) => {

    const data = await fetch('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Joke API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setAuthor(`${data.category} Joke`)
      .setDescription(data.type === 'duas partes' ? `${data.setup}\n\n||${data.delivery}||` : data.joke)
    );
  }
};
