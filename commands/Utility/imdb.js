const discord = require("discord.js");
const imdb = require("imdb-api");
const { Color } = require("../../config.json");

module.exports = {
name: "imdb",
  description: "Get the information about series and movie",
  category: "info",
  usage: "imdb <name>",
  aliases: '',
  run: async (client, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("Por favor, dê o nome do filme ou série")
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new discord.MessageEmbed()
    .setAuthor(movie.title, "https://cdn.discordapp.com/avatars/583794054240665601/0592e3d061a58b8d916f44206dd113dd.png")
    .setColor(Color)
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Avaliações: ${movie.rating}`)
    .addField("País", movie.country, true)
    .addField("línguas", movie.languages, true)
    .addField("Tipo", movie.type, true)
    .setTimestamp()
    .setFooter(message.author.tag, "https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif");
    
    //movie.title
    message.channel.send(embed)
    
    
    
  }

}
