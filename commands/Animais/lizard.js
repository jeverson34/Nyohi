const client = require('nekos.life');
const Discord = require('discord.js')
const { Color } = require("../../config.js");
const neko = new client();

module.exports = {
  name: "lizard",
  category: "Animais",
  aliases: ["lagarto"],
  description: "Mandar uma foto aleatoria de um lagarto",
  usage: "lizard",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.lizard());

        const lizard = new Discord.MessageEmbed()
        .setTitle("Random Lizard Image 🦎")
        .setImage(owo.url)
        .setColor(Color)
        .setFooter(message.author.tag)
        .setTimestamp();
        message.channel.send(lizard);

}

      work();
}
                };