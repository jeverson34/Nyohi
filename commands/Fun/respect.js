const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'respect',
  aliases: [ 'f', 'rp', '+rp' ],
  group: 'fun',
  description: 'Show thy respect. Accepts arguments.',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'respect',
    'f Kyoto Animation',
    'rp @user',
  ],
  run: async (client, message, args) => {

    const rep = await message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setFooter(`Pressione F para prestar respeito | \©️${new Date().getFullYear()} Nyohi`)
      .setDescription(`${message.member} prestou sua homenagem${args.length ? ` to ${args.join(' ')}.` : ''}`)
    );

    await message.delete().catch(() => null);

    return rep.react("🇫")
  }
};
