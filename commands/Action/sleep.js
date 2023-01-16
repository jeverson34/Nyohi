
const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'sleep',
  aliases: ['dormir'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Puts a user to sleep..',
  examples: [ 'hug @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/NsLqS9d.gif", "https://i.imgur.com/r5Lrhnt.gif", "https://i.imgur.com/3YFSqTk.gif", "https://i.imgur.com/LOpUSQP.gif", "https://i.imgur.com/YyVDiVX.gif", "https://i.imgur.com/ZDPukql.gif",
    "https://i.imgur.com/fjdHCdB.gif", "https://i.imgur.com/j6MIz6Z.gif", "https://i.imgur.com/jgI66b6.gif", "https://i.imgur.com/ZDfWFwA.gif", "https://i.imgur.com/vavcmrv.gif", "https://i.imgur.com/yviMY0r.gif",
    "https://i.imgur.com/FDuRl2k.gif", "https://i.imgur.com/UsIPKAw.gif", "https://i.imgur.com/XXuxIJP.gif", "https://i.imgur.com/rAvADgY.gif", "https://i.imgur.com/FqL4fde.gif", "https://i.imgur.com/t8YSWon.gif",
    "https://i.imgur.com/noahhz7.gif", "https://i.imgur.com/DxqNaN1.gif", "https://i.imgur.com/z6DjK4I.gif", "https://i.imgur.com/ANRw0ya.gif", "https://i.imgur.com/67Fyhwf.gif", "https://i.imgur.com/MP5DPPN.gif",
    "https://i.imgur.com/SmHuNbA.gif", "https://i.imgur.com/vIPnHtc.gif", "https://i.imgur.com/36EGBCJ.gif", "https://i.imgur.com/tctzjPV.gif", "https://i.imgur.com/gnYyKDB.gif", "https://i.imgur.com/XylgXah.gif",
    "https://i.imgur.com/hGabYAk.gif", "https://i.imgur.com/56gW65P.gif", "https://i.imgur.com/SNqgfWY.gif"
];

var rand = list[Math.floor(Math.random() * list.length)];

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Sleep')
        .setColor(Color)
        .setDescription(`${message.author.username} está dormindo`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
