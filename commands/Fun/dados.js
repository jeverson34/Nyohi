const { Color } = require("../../config.js");
const discord = require('discord.js');

module.exports = {
  name: "dados",
  aliases: [""],
  category: "Fun",
  description: "jogue os dados",
  usage: "dados 5",

    async run (client, message, args){

    if (args[0]) {
        if (args[0] < 1) return message.channel.send('Numero de dados inválido.');

        var dices = new Array();
        try {
            dices.length = parseInt(args[0]);
        } catch (e) {
            return message.channel.send('Numero de dados inválido.');
        }

        if (dices.length > 5)
            return message.channel.send('Você só pode jogar no máximo 5 dados por vez.');

        var dice_string = '';
        for (let i = 0; i < dices.length; i++) {
            dices[i] = Math.floor(Math.random() * 6) + 1;
            dice_string += `Dado ${i + 1}: **${dices[i]}**\n`;
        }

        return message.channel.send(new discord.MessageEmbed()
            .setAuthor(`Dados 🎲`)
            .addField('Resultado dos dados jogados', dice_string)
            .setColor(Color)
            .setFooter('Dados')
            .setTimestamp());

    } else {
        var dice = Math.floor(Math.random() * 6) + 1;
        return message.channel.send(`<@${message.author.id}> jogou o dado e parou em **${dice}** 🎲`);
    }
}
};