const { Color } = require("../../config.js");
const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "punch",
  category: ['action'],
  description: "de um soco em alguem",
  aliases: ['soco'],
  run: async(bot, message, args) => {
    
    let ment = message.mentions.users.first();
        if(!ment) 
            return message.channel.send("Mencione um usuário");
        if (ment.id == message.author.id)
            return message.channel.send('Como isso é possível');
        if (ment.id == bot.user.id && message.author.id == '782641177408045070')
            return message.channel.send('BAKA, Eu não gosto de você');
    let data = await random.getAnimeImgURL("punch");

let avatar = message.author.displayAvatarURL({format: 'png'});
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setTitle('Punch')
    .setColor(Color)
    .setDescription(`${message.author.username} seu um soco em ${ment.username}`)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);
    
    message.channel.send(embed);
  }
};