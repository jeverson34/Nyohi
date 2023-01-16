module.exports = {
  name: 'softban',
  aliases: [],
  guildOnly: true,
  permissions: [ 'BAN_MEMBERS' ],
  clientPermissions: [ 'BAN_MEMBERS' ],
  group: 'moderation',
  description: 'expulsar um usuário e exclui todas as mensagens dele nos últimos 7 dias',
  parameters: [ 'user Mention/ID' ],
  examples: [
    'softban @user',
    'softban 7283746574829102938'
  ],
  run: async (client, message, [ member = '' ]) => {

    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`\\❌ | ${message.author}, Por favor, me de o ID ou mencione o usuário ao softban.`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ | ${message.author}, Usuário não encontrado! Certifique-se de que o ID fornecido é válido.`);
    } else if (member.id === message.author.id){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode da softban a si mesmo!`);
    } else if (member.id === client.user.id){
      return message.channel.send(`\\❌ | ${message.author}, Por favor, não me da softban!`);
    } else if (member.id === message.guild.ownerID){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode fazer o softban em um proprietário de servidor!`);
    } else if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode softban esse usuário! Ele / ela tem um papel mais importante do que o seu`);
    } else if (!member.bannable){
      return message.channel.send(`\\❌ | ${message.author}, Eu não pude da softban naquele usuário!`)
    };

    return message.guild.members.ban(member, { reason:  `MAI_SOFTBANS: ${message.author.tag}`, days: 7 })
    .then(() => message.guild.members.unban(member, { reason: `MAI_SOFTBANS: ${message.author.tag}` }))
    .then(() => message.channel.send(`\\✔️  Softbanned Com sucesso **${member.user.tag}**`))
    .catch(() => message.channel.send(`\\❌ | ${message.author}, Incapaz de concluir o softban **${member.user.tag}**!`));
  }
};
