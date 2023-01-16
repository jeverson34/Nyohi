const discord = require("discord.js");
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'smug',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um GIF de RPG `presunçoso` para o chat. Normalmente interpretado como 「O usuário que usou este comando smugs no chat anterior」. Use para indicar que você sente o motivo oculto que o usuário anterior enviou no bate-papo.',
  examples: [ 'smug' ],
  parameters: [],
  run: async ( client, message, args ) => {


    let data = await random.getAnimeImgURL("smug");
 let avatar = message.author.displayAvatarURL({format: 'png'});   
    let embed = new discord.MessageEmbed()
    .setTitle(`Smug`)
    .setImage(data)
    .setColor(Color)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);   
    message.channel.send(embed);
  }
};