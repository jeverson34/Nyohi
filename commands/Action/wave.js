const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'wave',
  aliases: ['acenar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Acene para alguém.',
  examples: [ 'wave @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
  "https://i.imgur.com/Rvh9LTm.gif", "https://i.imgur.com/pUL03sH.gif", "https://i.imgur.com/EvevOAv.gif", "https://i.imgur.com/OuRyd1y.gif", "https://i.imgur.com/91chler.gif", "https://i.imgur.com/HJBZ3Z9.gif",
  "https://i.imgur.com/SeFfIDk.gif", "https://i.imgur.com/vPjgKw5.gif", "https://i.imgur.com/62bDTPI.gif", "https://i.imgur.com/jhTf7CG.gif", "https://i.imgur.com/PGalAXV.gif", "https://i.imgur.com/ctHE7dU.gif",
  "https://i.imgur.com/bOOETQR.gif", "https://i.imgur.com/u3fTy63.gif", "https://i.imgur.com/IPEBJfU.gif", "https://i.imgur.com/lKB4JYj.gif", "https://i.imgur.com/0FBKsjp.gif", "https://i.imgur.com/uacqjGS.gif",
  "https://i.imgur.com/332DOvG.gif", "https://i.imgur.com/FcHzylB.gif", "https://i.imgur.com/gLMueWE.gif", "https://i.imgur.com/qZLsZMq.gif", "https://i.imgur.com/yzS7s6g.gif"
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
        .setTitle('Wave')
        .setColor(Color)
        .setDescription(`${message.author.username} acenou para ${user.username}`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
