const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'kill',
  aliases: ['matar'],
  nsfw: true,
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `kill` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário que usou este comando deseja matar o usuário mencionado」. Use para indicar que você quer matar o usuário mencionado (o contexto pode variar). Este é um comando de interpretação de papéis e deve ser usado como uma piada. O contexto não deve incluir crimes reais.',
  examples: [ 'kill @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/3Rz9rAA.gif", "https://i.imgur.com/rzLZGpF.gif", "https://i.imgur.com/Qnhg8x1.gif"
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
        .setTitle('Kill')
        .setColor(Color)
        .setDescription(`${message.author.username} Matou ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};
