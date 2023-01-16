const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'baka',
  aliases: ["idiota"],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'açães',
  description: 'Envia um gif de roleplay `baka` para o chat, direcionado ao usuário mencionado. Normalmente interpretado como 「O usuário a quem este comando é direcionado é um idiota (em um contexto kawaii)」.',
  examples: [ 'blush @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

var list = [
    "https://i.imgur.com/AdFWT3q.gif", "https://i.imgur.com/WUWKIfd.gif", "https://i.imgur.com/jFSnFit.gif", "https://i.imgur.com/Wfw5QHh.gif", "https://i.imgur.com/'nHAl4Qt.gif", "https://i.imgur.com/idyYLuA.gif",
    "https://i.imgur.com/RqBL21C.gif", "https://i.imgur.com/M30Q4qa.gif", "https://i.imgur.com/84etIl2.gif", "https://i.imgur.com/QE5ETrU.gif", "https://i.imgur.com/'xFkJfSP.gif", "https://i.imgur.com/4hyZ7lp.gif",
    "https://i.imgur.com/TG1ygR1.gif", "https://i.imgur.com/vXNI2aI.gif", "https://i.imgur.com/uTRZcus.gif", "https://i.imgur.com/pc4lJy9.gif", "https://i.imgur.com/'srw0v17.gif", "https://i.imgur.com/fRN8t33.gif",
    "https://i.imgur.com/tSGDGRS.gif", "https://i.imgur.com/8ndgFuN.gif", "https://i.imgur.com/r8rEQgH.gif", "https://i.imgur.com/ZyaJNIV.gif", "https://i.imgur.com/'1CGujwz.gif", "https://i.imgur.com/kWRnK3F.gif",
    "https://i.imgur.com/3eSRCmQ.gif", "https://i.imgur.com/I2kj8mC.gif", "https://imgur.com/a/WNnMdr5.gif", "https://imgur.com/0OjsgCg.gif",   "https://imgur.com/8ys2RK9.gif",    "https://imgur.com/4F3A6d1.gif",
    ""
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Baka')
        .setColor(Color)
        .setDescription(`${message.author.username} chamou ${user.username} de baka`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};