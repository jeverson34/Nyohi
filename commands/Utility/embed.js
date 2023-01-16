const { Color } = require("../../config.js");
const Discord = require('discord.js')

module.exports = {
  name: "embed",
  aliases: [""],
  category: "Utility",
  description: "escreva um texto em uma embed",
  usage: 'embed <texto>',
  run: async (client, message, args) => {
    await message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg=> msg.delete(8000))
    
    let mensg = args.join(' ')
    if(!mensg) {
        message.channel.send(`${message.author}, digite uma mensagem para inserir.`)
    return undefined;
    }

        const embed = new Discord.MessageEmbed()
    .setDescription(`${mensg}`, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")
    .setColor(Color)
    .setTimestamp()
    .setFooter(`Publicado por: ${message.author.username}`, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")
        message.channel.send(embed)
}
};