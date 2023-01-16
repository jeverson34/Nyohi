const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'blush',
  aliases: ['corar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Ficar corado.',
  examples: [ 'blush' ],
  parameters: [  ],
  run: async ( client, message, args ) => {

var list = [
    "https://i.imgur.com/fuPUm5L.gif", "https://i.imgur.com/fQHHRJR.gif", "https://i.imgur.com/PY8s03Q.gif", "https://i.imgur.com/2vJG2Hz.gif", "https://i.imgur.com/UT4TBVk.gif", "https://i.imgur.com/WnbizWJ.gif",
    "https://i.imgur.com/t2lhJYR.gif", "https://i.imgur.com/lTxGOsH.gif", "https://i.imgur.com/ddD5hD7.gif", "https://i.imgur.com/yLJREfa.gif", "https://i.imgur.com/hzTHUIM.gif", "https://i.imgur.com/sjTvKDp.gif",
    "https://i.imgur.com/e6Ve76r.gif", "https://i.imgur.com/IROuDCJ.gif", "https://i.imgur.com/paOfyGh.gif", "https://i.imgur.com/YS3wBa0.gif", "https://i.imgur.com/Hyw1iKi.gif", "https://i.imgur.com/CB9dMFU.gif",
    "https://imgur.com/HRfLjt1.gif", "https://imgur.com/KbyKL2f.gif", "https://imgur.com/0Or3RrH.gif", "https://imgur.com/2R073Qk.gif", "https://imgur.com/t7fJtUz.gif", "https://imgur.com/tffVWpQ.gif", "https://imgur.com/UCNGJpz.gif",
    "https://imgur.com/1A5fdQr.gif", "https://imgur.com/YOsIJOk.gif", "https://imgur.com/cExz0AW.gif", "https://imgur.com/ItH8PEi.gif", "https://imgur.com/b97Y88O.gif", "https://imgur.com/pC38NQR.gif", "https://imgur.com/14UdCOn.gif"
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Blush')
        .setColor(Color)
        .setDescription(`${message.author.username} ficou corado(a) `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
