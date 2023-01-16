const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const { Color } = require("../../config.js");

module.exports = {
  name: 'listrole',
  aliases: [ 'roles' ],
  group: 'utility',
  guildOnly: true,
  description: 'Exibe na lista todas as funções que este servidor possui',
  examples: [
    'listrole',
    'roles'
  ],
  run: async (client, message) => message.channel.send(
    new MessageEmbed()
    .setColor(Color)
    .setAuthor(` ${message.guild.name} Lista de funções`)
    .addFields(
      _.chunk(message.guild.roles.cache.array()
        .filter(x => x.id !== message.guild.id)
        .sort((A,B) => B.rawPosition - A.rawPosition), 10)
        .map(x => {
          return {
            name: '\u200b', inline: true,
            value: '\u200b' + x.map(x => `\u2000•\u2000${x}`).join('\n')
          };
        })
    )
  )
};
