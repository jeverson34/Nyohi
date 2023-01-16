const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'happy',
  aliases: ['feliz'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um Gif de RPG `happy` para o chat. Normalmente interpretado como 「O usuário que usou este comando está feliz (shiawase da !!)」. Use para indicar que você está feliz no momento (o contexto pode variar). Pode ser usado em um contexto semelhante ao emoji 😃.',
  examples: [ 'happy' ],
  parameters: [],
  run: async ( client, message ) => {
var list = [
    "https://i.imgur.com/JwmKLWg.gif", "https://i.imgur.com/xvoAhQ1.gif", "https://i.imgur.com/4HQQCpF.gif", "https://i.imgur.com/bbfsMC3.gif", "https://i.imgur.com/0nCCqnu.gif", "https://i.imgur.com/zkqutM9.gif",
    "https://i.imgur.com/JGipzNn.gif", "https://i.imgur.com/4kjCccc.gif", "https://i.imgur.com/Gkp9M4T.gif"
];

var rand = list[Math.floor(Math.random() * list.length)];

/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Happy')
        .setColor(Color)
        .setDescription(`${message.author.username} esta feliz `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
