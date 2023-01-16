const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'midfing',
  aliases: ["dedo"],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  nsfw: true,
  description: 'Envia um gif de roleplay `midfing` para o chat, direcionado ao usuário mencionado. Normalmente interpretado como 「O usuário que usou este comando deseja que o usuário mencionado desligue」. Use para indicar que você está incomodado com o usuário (o contexto pode variar). Este é um comando de interpretação de papéis e deve ser usado como uma piada.',
  examples: [ 'midfing @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/xW8aPyL.gif", "https://i.imgur.com/56PukJb.gif", "https://i.imgur.com/2lTUrGA.gif", "https://i.imgur.com/lr0W2He.gif", "https://i.imgur.com/PnhwqzZ.gif", "https://i.imgur.com/0JlHMlW.gif",
    "https://i.imgur.com/qwvkDoR.gif", "https://i.imgur.com/bryOtIH.gif"
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
        .setTitle('Midfing')
        .setColor(Color)
        .setDescription(`${message.author.username} mostrou o dedo para ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
