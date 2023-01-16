const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'disgust',
  aliases: ['nojo'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `nojo` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado está digusting (Mazui !!, Kimoi !!)」. Use para indicar que você está enojado com as ideias deles em bate-papos anteriores. Pode ser usado em um contexto semelhante ao emoji 🤮.',
  examples: [ 'disgust @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/QWnfJAH.gif", "https://i.imgur.com/SBfI0G6.gif", "https://i.imgur.com/njSUTVF.gif", "https://i.imgur.com/YTzm1sN.gif", "https://i.imgur.com/fWj0VTx.gif", "https://i.imgur.com/zy5fUCK.gif",
    "https://i.imgur.com/baKjBxC.gif", "https://i.imgur.com/bgP3kXO.gif", "https://i.imgur.com/DXburdT.gif", "https://i.imgur.com/MuS9YpB.gif", "https://i.imgur.com/mKuXemO.gif", "https://i.imgur.com/QIUuzBq.gif",
    "https://i.imgur.com/X4e6T4L.gif", "https://i.imgur.com/N9uBZuE.gif", "https://i.imgur.com/ud1kqo7.gif", "https://i.imgur.com/yzMDT3g.gif", "https://i.imgur.com/5xQJ6dH.gif", "https://i.imgur.com/vFE6dnx.gif",
    "https://i.imgur.com/pyxLdyR.gif", "https://i.imgur.com/93FFsdY.gif", "https://i.imgur.com/8xC8POE.gif", "https://i.imgur.com/0PiqIwV.gif", "https://i.imgur.com/LvyXnNV.gif", "https://i.imgur.com/5u6BKEc.gif",
    "https://i.imgur.com/kR8t7rq.gif"
];

var rand = list[Math.floor(Math.random() * list.length)];

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Disgust')
        .setColor(Color)
        .setDescription(`${message.author.username} está com nojo`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};