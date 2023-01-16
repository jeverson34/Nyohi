const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'color',
  aliases: [ 'colour', 'hex' ],
  group: 'utility',
  description: 'Mostra uma cor aleatória ou uma antevisão da cor dada',
  parameters: [ 'hex code' ],
  examples: [
    'color',
    'color #ffffff'
  ],
  run: (client, message, [ hex = '']) => {

    const color = hex.match(/[0-9a-f]{6}/) ||
    Math.floor(Math.random() * 16777215).toString(16)

    return message.channel.send(
      new MessageEmbed()
      .setColor(`#${color}`)
      .setImage('https://dummyimage.com/200/' + color)
    );
  }
};
