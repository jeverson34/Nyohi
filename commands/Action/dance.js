const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'dance',
  aliases: ['dançar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um GIF de RPG `dance` para o chat. Geralmente interpretado como 「O usuário que usou este comando está dançando (de alegria)」. Use para indicar que você está dançando no momento (o contexto pode variar).',
  examples: [ 'dance' ],
  parameters: [],
  run: async ( client, message ) => {
var list = [
    "https://i.imgur.com/sZ750iM.gif", "https://i.imgur.com/yFE0A4z.gif", "https://i.imgur.com/cjcYrqI.gif", "https://i.imgur.com/28zzdho.gif", "https://i.imgur.com/5ULGhAn.gif", "https://i.imgur.com/hgOoVQT.gif",
    "https://i.imgur.com/YbdJb5Z.gif", "https://i.imgur.com/VV8f9TC.gif", "https://i.imgur.com/P3pdnij.gif", "https://imgur.com/dImYn7R.gif", "https://imgur.com/MBJWSrS.gif", "https://imgur.com/hOcGRB6.gif", "https://imgur.com/d45i4Ea.gif",
    "https://imgur.com/UQBnZLo.gif", "https://imgur.com/NW5XgFf.gif", "https://imgur.com/4xiVG9v.gif", "https://imgur.com/llhZ0rh.gif", "https://imgur.com/lK301rl.gif", "https://imgur.com/iMVLkR6.gif", "https://imgur.com/6jVtF2q.gif",
    "https://imgur.com/Jis5JBo.gif", "https://imgur.com/Swr740A.gif", "https://imgur.com/Kx5kIhW.gif", "https://imgur.com/Xqscnl4.gif", "https://imgur.com/Xoz65Fn.gif", "https://imgur.com/W1k0hb9.gif", "https://imgur.com/DxJhnIO.gif",
    "https://imgur.com/xa9gta6.gif", "https://imgur.com/OrPmyzi.gif", "https://imgur.com/HGYePZj.gif", "https://imgur.com/zmdmn6Y.gif", "https://imgur.com/M50RT7K.gif", "https://imgur.com/91gU6pI.gif", "https://imgur.com/HVARoMx.gif",
];

var rand = list[Math.floor(Math.random() * list.length)];

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Dance')
        .setColor(Color)
        .setDescription(`${message.author.username} está dançando`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};