

const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: "aviso",
  usage: "aviso <text>",
  aliases: '',
  description: "enviar um aviso",
  category: "moderation",
  run: (client, message, args) => {
    if (!message.member.roles.cache.has('Rapid Admin') && !message.member.hasPermission("ADMINISTRATOR")) {
		return message.channel.send("Você não tem permissão para executar esse comando!");
    }
    
    if(!args.length) {
      return message.channel.send("Por favor, dê seu aviso")
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "avisos" || x.name === "avisos"))
    
    
    if(!channel) {
      return message.channel.send("Crie um canal chamado #avisos")
    }

    let twt = args.join(" ");
    if (!twt) return message.reply("Insira sua mensagem.")
                                                    
    
    let embed = new Discord.MessageEmbed()
    .setColor(Color)
    .addField("<a:alert:791015737685704714> **aviso** <a:alert:791015737685704714>", `${twt}`)
    .setFooter(`Novo aviso Recebido: ${message.author.tag}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp(new Date())
 
    
    
    channel.send(embed).then(m => {
      m.react("")
      m.react("")
    })
    

    
    message.channel.send("Enviou seu aviso para " + channel)
    
  }
}