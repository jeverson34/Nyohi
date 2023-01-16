const Discord = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "gay",
  usage: "homo",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (yuno, message, args) => {
if (!message.channel.nsfw) return message.reply("🔞 Este comando só pode ser usado em um canal NSFW!! 🔞")
var yrgaypic = require('yuredditgay');
yrgaypic(function(data, err) {
    var embed = new Discord.MessageEmbed()
   .setAuthor(`${data.title[0]}`, "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
     .setDescription(` -- r/${data.subreddit[0]}`)
     .setColor(Color)
     .setImage(`${data.url[0]}`)
     .setTimestamp()
     .setFooter('ykiss', "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif");
message.channel.send(embed);
});
}
};