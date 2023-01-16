const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'emoji',
  aliases: [],
  group: 'utility',
  desciption: 'Exibir a versão maior do emoji fornecido',
  parameters: [ 'emoji' ],
  examples: [
    'emoji :exampleonly:'
  ],
  get examples(){ return [ this.name + ' <emoji>'];},
  run: (cient, message, [emoji = '']) => {

    if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
      return message.channel.send(`\\❌ | ${message.author}, por favor insira um emoji personalizado válido!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
    );
  }
};
