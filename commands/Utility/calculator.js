const { Color } = require("../../config.js");
const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
  name: "Calculator",
  aliases: ["calculadora"],
  category: "Utility",
  description: "use a calculadora",
  usage: "calculator 1+1",
  run: async (client, message, args) => {

        if(!args[0]) return message.channel.send('Por favor, forneça uma pergunta');

        let resp;

        message.delete().catch(O_o => {});

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Por favor, forneça uma pergunta **válida**')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setAuthor('Calculator')
        .addField('Questão', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Resposta', `\`\`\`css\n${resp}\`\`\``)
        .setTimestamp()
        .setFooter(message.author.tag)

        message.channel.send(embed);

    }
}