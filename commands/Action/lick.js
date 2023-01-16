const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'lick',
  aliases: ['lamber'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `lick` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado foi lambido (lero lero lero lero lero)」. Use para indicar que você deseja lamber o usuário mencionado (o contexto pode variar).',
  examples: [ 'lick @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/CHHlRfG.gif", "https://i.imgur.com/L5CyK5B.gif", "https://i.imgur.com/YzoJv0Y.gif", "https://i.imgur.com/WFj5Axk.gif", "https://i.imgur.com/4FTR7pU.gif", "https://i.imgur.com/tdXIxic.gif",
    "https://i.imgur.com/9yHW6ue.gif", "https://i.imgur.com/wBYjt9N.gif"
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
        .setTitle('Lick')
        .setColor(Color)
        .setDescription(`${message.author.username} lambeu ${user.username} `)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};

