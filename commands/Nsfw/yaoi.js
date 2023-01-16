  
const Discord = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "yaoi",
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (yuno, message, args) => {
if (!message.channel.nsfw) return message.reply("🔞 Este comando só pode ser usado em um canal NSFW! 🔞")
var yryaoipic = require('yureddityaoi');
yryaoipic(function(data, err) {
    var embed = new Discord.MessageEmbed()
     .setAuthor(`${data.title[0]}`)
     .setDescription(` -- r/${data.subreddit[0]}`)
     .setColor(Color)
     .setImage(`${data.url[0]}`)
     .setTimestamp()
     .setFooter('ykiss');
message.channel.send(embed);
});
}
};