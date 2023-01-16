const Discord = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'tickle',
  aliases: ['cocegas'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `tickle` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado foi pressionado」. Use para indicar que você fez cócegas no usuário mencionado (o contexto pode variar).',
  examples: [ 'tickle @user' ],
  parameters: ['User Mention'],
  run: async ( client, message, args ) => {
var list = [
    "https://i.imgur.com/cKv6wJi.gif", "https://i.imgur.com/xTCXQ9K.gif", "https://i.imgur.com/8ZEjA9C.gif", "https://i.imgur.com/BNkCALK.gif", "https://i.imgur.com/6ltZTlv.gif", "https://i.imgur.com/8lt4QU8.gif",
    "https://i.imgur.com/gfu2VBV.gif", "https://i.imgur.com/WQFBtb6.gif", "https://i.imgur.com/2oEN7SF.gif", "https://i.imgur.com/8AFOrgf.gif", "https://i.imgur.com/CqylXCq.gif", "https://i.imgur.com/X6wGn3y.gif",
    "https://i.imgur.com/C4MmaER.gif", "https://i.imgur.com/171EHxa.gif", "https://i.imgur.com/ILfm1EP.gif", "https://i.imgur.com/bKcgwHW.gif", "https://i.imgur.com/nmYqS8l.gif", "https://i.imgur.com/IcAP19n.gif",
    "https://i.imgur.com/pENMORd.gif"
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
        .setTitle('Tickle')
        .setColor(Color)
        .setDescription(`${message.author.username} fez cócegas em ${user.username}`)
        .setImage(rand)
        .setTimestamp()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
};

