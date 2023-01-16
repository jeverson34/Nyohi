const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'holdhands',
  aliases: ["segurarmão", "hdh"],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Dê as mãos a alguém especial.',
  examples: [ 'holdhands @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/fNGDlqB.gif", "https://i.imgur.com/3KIDQlu.gif", "https://i.imgur.com/dcgGJ9A.gif", "https://i.imgur.com/jXqSIgz.gif", "https://i.imgur.com/pFvrgo8.gif", "https://i.imgur.com/46MuGTr.gif",
    "https://i.imgur.com/3if9scl.gif", "https://i.imgur.com/1gliMhN.gif", "https://i.imgur.com/cRxuZvC.gif", "https://i.imgur.com/CnvaxRp.gif", "https://i.imgur.com/IUHLuKe.gif", "https://i.imgur.com/9J09nvm.gif",
    "https://i.imgur.com/AnzriGs.gif", "https://i.imgur.com/363rCne.gif", "https://i.imgur.com/7kolbuw.gif"
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
        .setTitle('Holdhands')
        .setColor(Color)
        .setDescription(`${message.author.username} segurou a mão de ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};