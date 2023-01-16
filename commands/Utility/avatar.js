const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'avatar',
  aliases: [ 'av', 'pfp', 'displayprofile' ],
  clientPermissions: [ 'EMBED_LINKS' ],
  group: 'utility',
  description: 'Shows avatar of the provided user, or yourself',
  parameters: [ 'User Mention / ID' ],
  examples: [
    'avatar',
    'av @user',
    'pfp 728394857686950485'
  ],
  run: async (client, message, [user = '']) => {

    let color;

    if (message.guild){
      const id = (user.match(/\d{17,19}/)||[])[0] || message.author.id;

      member = await message.guild.members.fetch(id)
      .catch(() => message.member);

      color = member.displayColor || Color;
      user = member.user;
    } else {
      color = Color;
      user = message.author;
    };

    const avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

    return message.channel.send(
      new MessageEmbed()
      .setColor(color)
      .setImage(avatar)
      .setDescription(`[Avatar de **${user.tag}**](${avatar})`)
    );
  }
};
