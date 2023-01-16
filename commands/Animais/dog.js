const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "dog",
  aliases: ["cachorro"],
  category: "Animais",
  description: "Mandar uma foto aleatoria de um cachorro",
  usage: "dog",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.woof());

        const dog = new Discord.MessageEmbed()
        .setTitle("Random dog Image 🐶")
        .setImage(owo.url)
        .setColor(Color)
        .setFooter(message.author.tag)
        .setTimestamp();
        message.channel.send(dog);

}

      work();
}
                };