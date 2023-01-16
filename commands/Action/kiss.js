const Discord = require('discord.js');
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'kiss',
  aliases: ['beijar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif ou foto de roleplay `kiss` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado foi beijado」. Use para indicar que você quer beijar o usuário mencionado (o contexto pode variar). Pode ser usado em um contexto semelhante ao emoji 😘.',
  examples: [ 'kiss @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
          let user = message.mentions.users.first() || client.users.cache.get(args[0]);
          if (!user) {
          return message.reply('lembre-se de mencionar um usuário válido');
          }
    
    let data = await random.getAnimeImgURL("kiss");
let avatar = message.author.displayAvatarURL({format: 'png'});    
    let embed = new Discord.MessageEmbed()
    .setTitle('Kiss')
    .setDescription(`${message.author.username} beijou ${user.username}`)
    .setImage(data)
    .setColor(Color)
    .setFooter()
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);    
    message.channel.send(embed);
  }
};
