const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'poke',
  aliases: ['cutucar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `poke` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário mencionado ignora você, então você o cutuca」. Use para indicar que você precisa da atenção do usuário mencionado (o contexto pode variar).',
  examples: [ 'poke @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/iiaMtNa.gif", "https://i.imgur.com/7ZUnnAZ.gif", "https://i.imgur.com/DyqJ9ok.gif", "https://i.imgur.com/P4R9VGb.gif", "https://i.imgur.com/BzjmMa1.gif", "https://i.imgur.com/ft8qbXn.gif",
    "https://i.imgur.com/JyPFwcy.gif", "https://i.imgur.com/clSVlOo.gif", "https://i.imgur.com/Z2a6QPZ.gif", "https://i.imgur.com/QwXMRTY.gif", "https://i.imgur.com/nLSrf3P.gif", "https://i.imgur.com/HzXTeo9.gif",
    "https://i.imgur.com/rjWbHkG.gif", "https://i.imgur.com/rlNvRXy.gif", "https://i.imgur.com/E7JBAAC.gif", "https://i.imgur.com/zUdYbxX.gif", "https://i.imgur.com/CjI5ZlO.gif", "https://i.imgur.com/P0ZunBb.gif",
    "https://i.imgur.com/5DyDruQ.gif", "https://i.imgur.com/Bjdr1po.gif", "https://i.imgur.com/jRLYoyR.gif", "https://i.imgur.com/FGZXxHH.gif", "https://i.imgur.com/qW7AQsD.gif"
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
        .setTitle('Poke')
        .setColor(Color)
        .setDescription(`${message.author.username} cutucou ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
