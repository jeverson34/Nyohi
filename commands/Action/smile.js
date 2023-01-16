const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'smile',
  aliases: ['sorrir'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Sorri para um usuário.',
  examples: [ 'smile @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/HnNBPfP.gif", "https://i.imgur.com/0HmEBV2.gif", "https://i.imgur.com/pxEaH3n.gif", "https://i.imgur.com/d0hN3Pf.gif", "https://i.imgur.com/ceQRPHE.gif", "https://i.imgur.com/sfswypY.gif",
    "https://i.imgur.com/0ZsREe8.gif", "https://i.imgur.com/h0NRqOR.gif", "https://i.imgur.com/xd4V7Wo.gif", "https://i.imgur.com/FzihIxv.gif", "https://i.imgur.com/GwUn6Eu.gif", "https://i.imgur.com/ako9fPf.gif",
    "https://i.imgur.com/5VNAuAN.gif", "https://i.imgur.com/iVvFegH.gif", "https://i.imgur.com/MrM9tei.gif", "https://i.imgur.com/m5U2COT.gif", "https://i.imgur.com/C1AOj2v.gif", "https://i.imgur.com/dQ1pYsr.gif",
    "https://i.imgur.com/a2OFjWe.gif", "https://i.imgur.com/XZbvFZe.gif", "https://i.imgur.com/mVrMgk5.gif", "https://i.imgur.com/YBxd6gi.gif", "https://i.imgur.com/pCQnSPt.gif", "https://i.imgur.com/ExGT9kI.gif",
    "https://i.imgur.com/Ebt5WUz.gif", "https://i.imgur.com/0yqpMXL.gif", "https://i.imgur.com/HGAhAW1.gif", "https://i.imgur.com/8xCIqUA.gif", "https://i.imgur.com/iuBGUSi.gif", "https://i.imgur.com/XNep1Eb.gif",
    "https://i.imgur.com/eyaOyE0.gif", "https://i.imgur.com/f8GnxzS.gif", "https://i.imgur.com/X1e9LfO.gif", "https://i.imgur.com/rvvalVd.gif", "https://i.imgur.com/oTCJEoI.gif", "https://i.imgur.com/Nu3JLoW.gif"
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
        .setTitle('Smile')
        .setColor(Color)
        .setDescription(`${message.author.username} sorrio para ${user.username}`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};