const { MessageEmbed } = require('discord.js');
const waifuDB = require('../../assets/json/waifulist.json');
const { Color } = require("../../config.js");

module.exports = {
  name: 'waifunsfw',
  aliases: ["wfs"],
  group: 'anime',
  description: 'Generates random waifu.',
  clientPermissions: [ 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY' ],
  parameters: [],
  examples: [
    'waifu'
  ],
  run: (client, message) => {

//---------------------------------WORK IN PROGRESS-----------------------------------//
    if (!message.channel.nsfw){
      return message.channel.send(`Este comando ainda está em andamento. As imagens podem ser NSFW às vezes, para ver como esse comando funciona, vá para um canal NSFW.`)
    };
//--------------------------------WORK IN PROGRESS------------------------------------//

    const waifu = waifuDB[Math.floor(Math.random() * (waifuDB.length))];
    const no = Math.floor(Math.random() * waifu.images.length);

    message.channel.startTyping();

    const embed = new MessageEmbed()
    .setColor(Color)
    .setAuthor([ waifu.names.en, waifu.names.jp ].filter(Boolean).join('\u2000•\u2000'))
    .setDescription([ waifu.names.alt, waifu.from.type].filter(Boolean).join('\n'))
    .attachFiles([{ attachment: waifu.images[no], name: 'waifu.jpg'}])
    .setImage('attachment://waifu.jpg')
    .setFooter([
      `${( 100 * (((1 - waifu.statistics.hate / (waifu.statistics.love + waifu.statistics.fav)) * 0.6) + ((waifu.statistics.upvote / (waifu.statistics.upvote + waifu.statistics.downvote)) * 0.4)) ).toFixed(2)}% Likebility`,
      `Image #${ no + 1 } de ${ waifu.images.length }`,
      `\©️${new Date().getFullYear()} Nyohi`
    ].join('\u2000|\u2000'));

    return message.channel.send(embed).then( m => m.react('💖')).then(() => message.channel.stopTyping())

  }
};
