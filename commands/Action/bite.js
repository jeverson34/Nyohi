const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'bite',
  aliases: ["morder"],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `bite` para o chat, direcionado ao usuário mencionado. Normalmente interpretado como 「O usuário a quem este comando foi direcionado foi mordido por [user].',
  examples: [ 'bite @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

var list = [
    "https://imgur.com/Qq5ffsq.gif", "https://imgur.com/w5V2mn0.gif", "https://imgur.com/LhBtGvO.gif", "https://imgur.com/oDYhMOs.gif", "https://imgur.com/IwR9wj6.gif", "https://imgur.com/yhGwkrg.gif", "https://imgur.com/SLyyFLT.gif", "https://imgur.com/Koay1YT.gif", "https://imgur.com/cxIDDhm.gif", "https://imgur.com/VYp1KO7.gif",
    "https://imgur.com/Q8X5w58.gif", "https://imgur.com/LKKHVc5.gif", "https://imgur.com/qjkLNKq.gif", "https://imgur.com/qcTHaKy.gif", "https://imgur.com/tahS9sR.gif", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",    
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "",  
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
        .setTitle('Bite')
        .setColor(Color)
        .setDescription(`${message.author.username} mordeu ${user.username}`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};