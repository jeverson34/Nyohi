const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { Color } = require("../../config.js");

module.exports = {
  name: "cat",
  aliases: ["gato"],
  category: "Animais",
  description: "sends random cat image",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.meow());

        const cat = new Discord.MessageEmbed()
        .setTitle("Random Cat Image")
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(cat);

}

      work();
}
                };