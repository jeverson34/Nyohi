const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signs = require('../../util/constants').horoscope;
const { Color } = require("../../config.js");

module.exports = {
  name: 'horoscope',
  aliases: ["hp"],
  group: 'fun',
  description: 'Find out your horoscope for today!',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'horoscope libra',
    'horoscope sagittarius'
  ],
  run: async (client, message, [sign] ) => {

    if (!sign){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Por favor, dê-me um signo para obter o horóscopo de!`);
    };

    if (!Object.keys(signs).includes(sign.toLowerCase())){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, **${sign}** não é um sinal válido! tente me dar o nome em English`);
    };

    const data = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Horoscope API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setAuthor(signs[sign.toLowerCase()] + ' ' + data.sunsign || sign)
      .setDescription(data.horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', ''))
      .addFields([
        { name: 'Humor', inline: true, value: data.meta.mood || '\u200b' },
        { name: 'Intensidade', inline: true, value: data.meta.intensity || '\u200b' },
        { name: 'Palavras-chave', inline: true, value: data.meta.keywords || '\u200b' }
      ])
    );
  }
};
