module.exports = {
  name: 'kick',
  aliases: ["kick"],
  guildOnly: true,
  permissions: [ 'KICK_MEMBERS' ],
  clientPermissions: [ 'KICK_MEMBERS' ],
  group: 'moderation',
  description: 'Expulsar o usuário mencionado deste servidor.',
  parameters: [ 'User Mention | ID', 'Kick Reason'],
  examples: [
    'kick @user breaking server rules',
    'kick @user',
    'kick 7827342137832612783'
  ],
  run: async (client, message, [member = '', ...reason] ) => {

    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`\\❌ | ${message.author}, Forneça o ID ou mencione o usuário para chutar. [mencione primeiro antes de adicionar o motivo]`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ | ${message.author}, Usuário não encontrado! Certifique-se de que o ID fornecido é válido. Mencione o usuário para obter mais precisão na localização do usuário.`);
    };

    if (member.id === message.author.id){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode se chutar!`);
    };

    if (member.id === client.user.id){
      return message.channel.send(`\\❌ | ${message.author}, Por favor, não me chute!`);
    };

    if (member.id === message.guild.ownerID){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode expulsar o proprietário de um servidor!`);
    };

    if (client.config.owners.includes(member.id)){
      return message.channel.send(`\\❌ | ${message.author}, Não, você não pode chutar meus desenvolvedores através de mim!`)
    };

    if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`\\❌ | ${message.author}, Você não pode chutar aquele usuário! Ele / ela tem um papel mais importante do que o seu`)
    };

    if (!member.kickable){
      return message.channel.send(`\\❌ | ${message.author}, Não consegui chutar aquele usuário!`);
    };

    await message.channel.send(`Tem certeza que quer expulsar **${member.user.tag}**? (y/n)`)

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send(`\\❌ | ${message.author}, cancelou o comando kick`);
    };

    await member.send(`**${message.author.tag}** espulsou você de ${message.guild.name}!\n**Razão**: ${reason.join(' ') || 'Não especificado.'}`)
    .catch(() => null);

    return member.kick({ reason: `Nyohi Kick Command: ${message.author.tag}: ${reason.join(' ') || 'Não especificado.'}`})
    .then(_member => message.channel.send(`\\✔️ expulso com sucesso **${_member.user.tag}**`))
    .catch(() => message.channel.send(`\\❌ Falha ao Expulsar **${member.user.tag}**!`));
  }
};
