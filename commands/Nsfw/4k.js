const { Color } = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "4k",
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (yuno, message, args) => {

if (!message.channel.nsfw) return message.reply("🔞 Este comando só pode ser usado em um canal NSFW!! 🔞")
var fourk = require('reddit4k');
fourk(function(data, err) {
    var embed = new Discord.MessageEmbed()
   //.setAuthor(`${data.title[0]}`)
   //.setDescription(` -- r/${data.subreddit[0]}`)
   .setColor(Color)
   .setImage(`${data.url[0]}`)
   .setTimestamp()
   .setFooter('4k');
message.channel.send(embed);
});
}
};