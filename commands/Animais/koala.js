const axios = require('axios');
const { Color } = require("../../config.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "koala",
  aliases: ["coala"],
  category: "Animais",
  description: "Mandar uma foto aleatoria de um coala",
  usage: "koala",
  run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/koala";
        const facts = "https://some-random-api.ml/facts/koala"

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
            .setTitle("Random Koala Image 🐨")
            .setImage(image.link)
            .setTimestamp()
            .setColor(Color)
            .setFooter(message.author.tag)
        await message.channel.send(embed)
    }
}