const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'respect',
  aliases: [ 'f', 'rp', '+rp' ],
  group: 'fun',
  description: 'Mostre o seu respeito. Aceita argumentos.',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'respect',
    'f Kyoto Animation',
    'rp @user',
  ],
  run: async (client, message, args) => {

    const rep = await message.channel.send(
      new MessageEmbed()
      .setColor('Color')
      .setFooter(`Pressione F para prestar respeito`)
      .setDescription(`${message.member} prestou sua homenagem${args.length ? ` para ${args.join(' ')}.` : ''}`)
    );

    await message.delete().catch(() => null);

    return rep.react("🇫")
  }
};
