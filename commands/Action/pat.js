const discord = require("discord.js");
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'pat',
  aliases: ['headpat', 'tapinha'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `pat` para o chat, direcionado ao usuário mencionado, se houver. Geralmente interpretado como 「O usuário deu uma palmadinha na cabeça ao usuário mencionado」. Use para indicar que você quer dar um tapinha na cabeça do usuário mencionado (o contexto pode variar).',
  examples: [ 'pat @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
          let user = message.mentions.users.first() || client.users.cache.get(args[0]);
          if (!user) {
          return message.reply('lembre-se de mencionar um usuário válido');
          }
    
    let data = await random.getAnimeImgURL("pat");
let avatar = message.author.displayAvatarURL({format: 'png'});    
    let embed = new discord.MessageEmbed()
    .setTitle('Headpat')
    .setDescription(`${message.author.username} deu um tapinha na cabeça do(a) ${user.username}`)
    .setImage(data)
    .setColor(Color)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);    
    message.channel.send(embed);
  }
};