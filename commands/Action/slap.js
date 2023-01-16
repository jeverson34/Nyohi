const discord = require("discord.js");
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'slap',
  aliases: ['tapa'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um gif de roleplay `tapa` para o chat, direcionado ao usuário mencionado, se houver. Normalmente interpretado como 「O usuário a quem este comando é direcionado levou um tapa」. Use para indicar que você quer dar um tapa no usuário mencionado (o contexto pode variar).',
  examples: [ 'slap @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {
          let user = message.mentions.users.first() || client.users.cache.get(args[0]);
          if (!user) {
          return message.reply('lembre-se de mencionar um usuário válido');
          }
    
    let data = await random.getAnimeImgURL("slap");
 let avatar = message.author.displayAvatarURL({format: 'png'});   
    let embed = new discord.MessageEmbed()
    .setTitle('Slap')
    .setDescription(`${message.author.username} deu um tapa em ${user.username}`)
    .setImage(data)
    .setColor(Color)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);    
    message.channel.send(embed);
  }
};
