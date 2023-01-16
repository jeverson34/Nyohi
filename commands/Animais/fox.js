const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: "fox",
  aliases: ["raposa"],
  category: "Animais",
  description: "Mandar uma foto aleatoria de uma raposa",
  usage: "fox",
  run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/fox";
        const facts = "https://some-random-api.ml/facts/fox"

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
            .setAuthor('Random fox Image 🦊')
            .setImage(image.link)
            .setTimestamp()
            .setColor(Color)
            .setFooter(message.author.tag)

        await message.channel.send(embed)
    }
}