const Discord = require("discord.js")
const { Color } = require("../../config.js");
 
module.exports = {
  name: 'ship',
  aliases: [""],
  group: 'fun',
  description: 'ship alguem',
  examples: [
    'ship <member> <member>',
  ],
  run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("Você esqueceu de mencionar alguém!")
        if (!args[1]) return message.channel.send("Você precisa mencionar outra pessoa!")
 
        if (args[0] || args[1]) {
            var FirstUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var SecondUser = message.mentions.members.first(-1) || message.guild.members.cache.get(args[1])
 
            if (!FirstUser) return message.channel.send(`Não consegui encontrar alguém chamado **${args[0]}**!`)
            if (!SecondUser) return message.channel.send(`Não consegui encontrar alguém chamado **${args[1]}**!`)
 
            if (FirstUser || SecondUser) {
                const FirstUserSliced = FirstUser.user.username.slice(0, FirstUser.user.username.length / 2)
                const SecondUserSliced = SecondUser.map(user => { return user.user.username.slice(user.user.username.length / 2) })
                const SecondUserName = SecondUser.map(user => { return user.user.username })
  

               const love = Math.random() * 100;
               const loveIndex = Math.floor(love / 10);
               const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

 //${FirstUser.user.username} + ${SecondUserName} = **${FirstUserSliced}${SecondUserSliced}**
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Ship`)
                .setColor(Color)
                .addField(`${FirstUser.user.username} + ${SecondUserName} = `, `**${FirstUserSliced}${SecondUserSliced}**`)
                .addField(`☁ A chance de **${FirstUserSliced}${SecondUserSliced}** é de:`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
                .setTimestamp()
                .setFooter(message.author.tag);
               
               message.channel.send(embed);

            }
        }
    }
}







