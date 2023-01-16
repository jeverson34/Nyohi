const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'feed',
  aliases: ['alimentar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif do RPG `feed` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado foi alimentado」. Use para indicar que você deseja alimentar o usuário.',
  examples: [ 'feed @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/naPItDn.gif", "https://i.imgur.com/kGWmok2.gif", "https://i.imgur.com/NlwR3on.gif", "https://i.imgur.com/h7Q2qmN.gif", "https://i.imgur.com/PdFT12Q.gif", "https://i.imgur.com/22iZkA2.gif",
    "https://i.imgur.com/UkJdJPq.gif", "https://i.imgur.com/Cocgdkl.gif", "https://i.imgur.com/iZYMQVg.gif", "https://i.imgur.com/9iEk6dL.gif", "https://i.imgur.com/qMIT1SM.gif", "https://i.imgur.com/hbMwzx8.gif",
    "https://i.imgur.com/hLBfsoN.gif", "https://i.imgur.com/7fqRXUp.gif", "https://i.imgur.com/q0NK3je.gif", "https://i.imgur.com/ZL0lkpn.gif"
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
        .setTitle('Feed')
        .setColor('Color')
        .setDescription(`${message.author.username} deu comida para ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};