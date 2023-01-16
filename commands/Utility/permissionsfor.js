const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");

module.exports = {
  name: 'permissionsfor',
  aliases: [ 'permsfor' ],
  group: 'utility',
  guildOnly: true,
  description: 'Liste as permissões de servidor do usuário mencionado ou ID fornecido',
  parameters: [ 'User ID/Mention' ],
  examples: [
    'permissionsfor @user',
    'permsfor 728394857675849399'
  ],
  run: async(client, message, [member = '']) => {

    if (!member.match(/\d{17,19}/)){
      member = message.author.id;
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ Usuário não encontrado.`);
    };

    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || Color)
      .setTitle(`Permissões de ${member.displayName}`)
      .setDescription([
        '\\♨️ - Este servidor',
        '\\#️⃣ - O Canal Atual',
        '```propriedades',
        '♨️ | #️⃣ | Permissão',
        '========================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`,
        '```'
      ].join('\n'))
    );
  }
};
