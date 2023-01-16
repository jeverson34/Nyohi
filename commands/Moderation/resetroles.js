module.exports = {
  name: 'resetroles',
  aliases: [ 'resetrole', 'removeroles', 'removerole', 'purgerole' ],
  guildOnly: true,
  permissions: [ 'MANAGE_ROLES' ],
  clientPermissions: [ 'MANAGE_ROLES' ],
  group: 'moderation',
  description: 'Remove ** todas ** as funções personalizadas de um usuário. (@everyone serão excluídos)',
  parameters: [ 'User Mention | ID' ],
  examples: [
    'resetroles @user',
    'resetrole 7283746571920016374'
  ],
  run: async (client, message, [member = '']) => {

    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`\\❌ | ${message.author}, Forneça o ID ou mencione o usuário para resetar. [mencione primeiro antes de adicionar o motivo]`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ Incapaz de redefinir funções do usuário: Usuário não encontrado.`);
    } else if (member.id === client.user.id){
      return message.channel.send(`\\❌ ${message.author}, Eu não recomendo redefinir minhas funções!`);
    } else if (member.user.bot){
      return message.channel.send(`\\❌ ${message.author}, Eu não recomendo redefinir as funções do bot! (Pode afetar a integração de funções)`);
    } else if (message.member.id === member.id){
      return message.channel.send(`\\❌ ${message.author},Você não pode redefinir suas próprias funções!`);
    } else if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`\\❌ ${message.author}, Você não pode modificar as funções do usuário que tem permissão superior à sua!`);
    } else if (!Boolean(member.roles.cache.size - 1)){
      return message.channel.send(`\\❌ ${message.author}, **${member.user.tag}** não tem funções para remover.`);
    };

    await message.channel.send(`Isso removerá todos os **${member.user.tag}**'s cargos, incluindo papéis especiais como papel mudo. Continuar?`);

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no','sim','s','não'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes','sim','s'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send(`\\❌ | **${message.author.tag}**, você cancelou o comando resetrole!`);
    };

    const prevRoleCount = member.roles.cache.size - 1;
    return member.roles.set([])
    .then(member => message.channel.send(`\\✔️ Removido com sucesso **${prevRoleCount}** cargos de **${member.user.tag}**!`))
    .catch(() => message.channel.send(`\\❌ Incapaz de remover todos os cargos de **${member.user.tag}**!`))
  }
};
