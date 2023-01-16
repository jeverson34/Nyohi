const { Client, Collection, MessageEmbed} = require('discord.js')
const Discord = require('discord.js');
const { Color } = require("../../config.json");

module.exports = {
    name: "youtube",
    aliases: ['yt', 'utube']
}

module.exports.run = async (client, message, args) => {
   if(!args[0]) message.reply('Por favor me diga o que você gostaria de pesquisar.');
   else {
       let search = args.join('+');

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Youtube`, "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
        .setColor(Color)
        .setDescription(`Resultados de pesquisa no YouTube: <https://www.youtube.com/results?search_query=${search}>`)
        .setTimestamp()
        .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif");

     message.channel.send(embed);
   }
}