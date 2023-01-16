const Discord = require('discord.js');
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'hug',
  aliases: ['abraçar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `abraço` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado foi abraçado」. Use para indicar que você deseja / deseja abraçar o usuário mencionado (o contexto pode variar). Pode ser usado em um contexto semelhante ao emoji 🤗.',
  examples: [ 'hug @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
          let user = message.mentions.users.first() || client.users.cache.get(args[0]);
          if (!user) {
          return message.reply('lembre-se de mencionar um usuário válido');
          }
    
    let data = await random.getAnimeImgURL("hug");
let avatar = message.author.displayAvatarURL({format: 'png'});    
    let embed = new Discord.MessageEmbed()
    .setTitle('Hug')
    .setDescription(`${message.author.username} abraçou ${user.username}`)
    .setImage(data)
    .setColor(Color)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);    
    message.channel.send(embed);
  }
};
