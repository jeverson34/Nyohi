const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { Color } = require("../../config.json");

module.exports = {
  name: "yuri",
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  run: async (client, message, args) => {
  //command

  //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.yuri());

        const yuri = new Discord.MessageEmbed()
        .setTitle("Yuri")
        .setImage(owo.url)
        .setColor(Color)
        .setURL(owo.url);
        message.channel.send(yuri);

}

      work();
}
                };