const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { Color } = require("../../config.js");

module.exports = {
  name: "goose",
  category: "Animais",
  aliases: ["ganso"],
  description: "Mandar uma foto aleatoria de um ganso",
  usage: "goose",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.goose());

        const goose = new Discord.MessageEmbed()
        .setTitle("Random goose Image <a:goose:809434226692063312>")
        .setImage(owo.url)
        .setColor(Color)
        .setFooter(message.author.tag)
        .setTimestamp();
        message.channel.send(goose);

}

      work();
}
                };