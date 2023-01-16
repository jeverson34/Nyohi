const discord = require("discord.js")
const { Color } = require("../../config.json");

module.exports = {
  name: "servericon",
  aliases: ["sv", "guildavatar"],
  category: "info",
  description: "Get avatar of the server",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    
      embed.setDescription(`[Download](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
      embed.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
      embed.setColor(Color)
    
      message.channel.send(embed)
    
  }
}