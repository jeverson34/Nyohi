const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: "panda",
  aliases: ["panda"],
  category: "Animais",
  description: "Mandar uma foto aleatoria de um panda",
  usage: "panda",
  run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/panda";
        const facts = "https://some-random-api.ml/facts/panda"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`Ocorreu um erro, tente novamente!`)
        }

        const embed = new MessageEmbed()
            .setTitle('Random panda Image 🐼')
            .setImage(image.link)
            .setTimestamp()
            .setColor(Color)
            .setFooter(message.author.tag)

        await message.channel.send(embed)
    }
}
