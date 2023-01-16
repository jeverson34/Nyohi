module.exports = {
  name: 'softmute',
  aliases: [ ],
  guildOnly: true,
  permissions: [ 'MANAGE_ROLES' ],
  group: 'moderation',
  description: 'Toggle to prevent a user from sending a message in this channel',
  parameters: [ 'User Mention | ID' ],
  examples: [
    'softmute @user',
    'softmute 728374657483920192'
  ],
  run: async (client, message, [member = '']) => {

    const muteID = (client.guildProfiles)


    const muted = message.guild.roles.cache.get(muteID) || {};

    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`\\❌ Forneça o ID ou mencione o usuário para silenciar.`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ Não foi possível silenciar o usuário: usuário não encontrado.`);
    } else if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`\\❌ ${message.author}, você não pode silenciar usuários cujas funções são superiores às suas!`);
    } else if (member.id === client.user.id){
      return message.channel.send(`\\❌ ${message.author}, não, não me mude!`);
    } else if (member.user.bot){
      return message.channel.send(`\\❌ ${message.author}, você não pode silenciar bots!`);
    } else if (message.member.id === member.id){
      return message.channel.send(`\\❌ ${message.author}, você não pode se silenciar!`);
    } else if (member.roles.cache.has(muted.id)){
      return message.channel.send(`\\❌ ${message.author}, **${member.user.tag}** já está mudo em todo o servidor!`);
    };

    return message.channel.updateOverwrite(member, {
      SEND_MESSAGES: !message.channel.permissionsFor(member).has('SEND_MESSAGES')
    }).then((ch) => message.channel.send(
      ch.permissionsFor(member).has('SEND_MESSAGES')
      ? `\\✔️ **${member.user.tag}** foi silenciado neste canal!`
      : `\\✔️ **${member.user.tag}** foi reativado neste canal!`
    )).catch(() => message.channel.send(
      message.channel.permissionsFor(member).has('SEND_MESSAGES')
      ? `\\❌ Incapaz de mute **${member.user.tag}** neste canal!`
      : `\\❌ Incapaz de unmute **${member.user.tag}** neste canal!`
    ));
  }
};
