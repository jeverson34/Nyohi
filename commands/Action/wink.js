const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'wink',
  aliases: ['piscar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Pisque para um usuário.',
  examples: [ 'wink @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
  "https://i.imgur.com/6zW1gTg.gif", "https://i.imgur.com/peTeUuV.gif", "https://i.imgur.com/mdaUExv.gif", "https://i.imgur.com/MB8x4yO.gif", "https://i.imgur.com/MxEuxWz.gif", "https://i.imgur.com/6MW9thg.gif",
  "https://i.imgur.com/2bfXlQG.gif", "https://i.imgur.com/M0rIIUC.gif", "https://i.imgur.com/IryKFc6.gif", "https://i.imgur.com/7ZcfU0c.gif", "https://i.imgur.com/yiUCEEq.gif", "https://i.imgur.com/nwzp30i.gif",
  "https://i.imgur.com/QDMeQsd.gif", "https://i.imgur.com/rP0HbsB.gif", "https://i.imgur.com/1Jompuw.gif", "https://i.imgur.com/Aiemomr.gif", "https://i.imgur.com/stFAght.gif", "https://i.imgur.com/ruZ8pKk.gif",
  "https://i.imgur.com/VuN7wXo.gif", "https://i.imgur.com/4FgPRMK.gif"
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
        .setTitle('Wink')
        .setColor(Color)
        .setDescription(`${message.author.username} piscou para ${user.username}`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
