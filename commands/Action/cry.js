const discord = require("discord.js");
const { Color } = require("../../config.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: 'cry',
  aliases: ['chorar'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Envia um GIF de RPG `cry` para o chat. Normalmente interpretado como 「O usuário que usou este comando está chorando」. Use para indicar que você está chorando. Pode ser usado em um contexto semelhante ao emoji 😢.',
  examples: [ 'cry' ],
  parameters: [],
  run: async ( client, message ) => {
    
    let data = await random.getAnimeImgURL("cry");
 let avatar = message.author.displayAvatarURL({format: 'png'});   
    let embed = new discord.MessageEmbed()
    .setTitle('Cry')
    .setDescription(`${message.author.username} está chorando`)
    .setImage(data)
    .setColor(Color)
    .setTimestamp()
    .setAuthor(message.author.tag, avatar);
    
    message.channel.send(embed);
  }
};
