const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'suicide',
  aliases: ['kms', 'suicidio'],
  nsfw: true,
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Sends a roleplay gif `suicide` to the chat. Usually interpreted as 「 The user who used this command wants to commit suicide (in a jokingly manner) 」. Use to indicate that you are stunned by the previous user\'s chats that it makes you want to kys. This is a roleplay command and is meant to be used as a joke, however, this will be limited to a nsfw channel due to sensitive nature of this command. Context should not include real crimes.',
  examples: [ 'suicide', 'kms' ],
  parameters: [],
  run: async ( client, message) => {
var list = [
    "https://i.imgur.com/uPOgWEL.gif", "https://i.imgur.com/pXQ3Tbu.gif", "https://i.imgur.com/qeJMJYL.gif", "https://i.imgur.com/lDl7kfX.gif", "https://i.imgur.com/5WTXS5L.gif", "https://i.imgur.com/iH4xt67.gif",
    "https://i.imgur.com/RVbPHuL.gif", "https://imgur.com/jL2Go3G.gif", "https://imgur.com/Qzw0UAX.gif", "https://imgur.com/xDGXgWE.gif", "https://imgur.com/ynzM40s.gif"
];

var rand = list[Math.floor(Math.random() * list.length)];

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Suicide')
        .setColor(Color)
        .setDescription(`${message.author.username} se suicidou`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
