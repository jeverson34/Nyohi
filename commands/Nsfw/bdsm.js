const Discord = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "ass",
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (yuno, message, args) => {
if (!message.channel.nsfw) return message.reply("🔞 Este comando só pode ser usado em um canal NSFW!! 🔞")
var yrbdsmpic = require('yuredditbdsm');
yrbdsmpic(function(data, err) {
    var embed = new Discord.MessageEmbed()
   .setAuthor(`${data.title[0]}`)
     .setDescription(` -- r/${data.subreddit[0]}`)
     .setColor(Color)
     .setImage(`${data.url[0]}`)
     .setTimestamp()
     .setFooter('bdsm', "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif");
message.channel.send(embed);
});
}
};