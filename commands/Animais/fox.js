const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.json");

module.exports = {
    name: "fox",
    category: "animais",
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
            .setAuthor('Imagem e fato aleatórios de uma raposa',  "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
            .setImage(image.link)
            .setTimestamp()
            .setColor(Color)
            .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")

        await message.channel.send(embed)
    }
}