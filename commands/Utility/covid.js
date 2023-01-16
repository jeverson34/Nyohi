const fetch = require('node-fetch');
const { Color } = require("../../config.js");
const Discord = require('discord.js');

module.exports = {
  name: "covid",
  aliases: ["corona"],
  category: "Utility",
  description: "veja as informaç~es sobre o corona",
  usage: ["covid all",
  "covid brazil"
  ],
  run: async (client, message, args) => {

        let countries = args.join(" ");

        //Argumentos ausentes

        const noArgs = new Discord.MessageEmbed()
        .setAuthor('Argumentos ausentes',  "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
        .setColor(Color)
        .setDescription('Estão faltando alguns argumentos (por exemplo:; covid all ||; covid Canada)')
        .setTimestamp()
        .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

//Estatísticas COVID-19 mundiais 🌎
                const embed = new Discord.MessageEmbed()
                .setAuthor('Estatísticas COVID-19 mundiais 🌎',  "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
                .addField('Casos confirmados', confirmed)
                .addField('Salvos', recovered)
                .addField('Mortes', deaths)
                .setTimestamp()
                .setColor(Color)
                .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

//Estatísticas COVID-19**${countries}**
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Estatísticas COVID-19 ${countries}`,  "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
                .addField('Casos confirmados', confirmed)
                .addField('Salvos', recovered)
                .addField('Mortes', deaths)
                .setTimestamp()
                .setColor(Color)
                .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")


                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('País inválido fornecido')
            })
        }
    }
}