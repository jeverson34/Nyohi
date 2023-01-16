var Discord = require('discord.js');
const superagent = require('superagent');
const { Color } = require("../../config.json");

module.exports = {
    name: 'nekogif',
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (client, message, args) => {
	if (msg.author.bot) return; // will not listen to bots
        let { body } = await superagent.get(`https://nekos.life/api/v2/img/ngif`).catch(error => msg.channel.send(`*welp, that's an error. try again.\ni bet it'll work next time*.\n \`${error}\``));

        let nekogifEmbed = new Discord.MessageEmbed()
            .setAuthor('uwu nyaa~')
            .setColor(Color)
            .setImage(body.url)

        msg.channel.send(nekogifEmbed)
    
}
};

