const { Owners } = require("../../config.js");

module.exports = {
  name: 'ban',
  aliases: ["ban"],
  guildOnly: true,
  permissions: [ 'BAN_MEMBERS' ],
  clientPermissions: [ 'BAN_MEMBERS' ],
  group: 'moderation',
  description: 'Banir o usuário mencionado deste servidor.',
  parameters: [ 'User Mention | ID', 'Ban Reason'],
  examples: [
    'ban @user breaking server rules',
    'ban @user',
    'ban 7827342137832612783'
  ],
  run: async (client, message, [member = '', ...reason] ) => {

    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Forneça o ID ou mencione o usuário para banir. [mencione primeiro antes de adicionar o motivo]`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Usuário não encontrado! Certifique-se de que o ID fornecido é válido. Mencione o usuário para obter mais precisão ao identificar o usuário.`);
    };

    if (member.id === message.author.id){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Você não pode se banir!`);
    };

    if (member.id === client.user.id){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Por favor não me de ban!`);
    };

    if (member.id === message.guild.ownerID){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Você não pode banir o proprietário de um servidor!`);
    };

    if (Owners.includes(member.id)){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Não, você não pode banir meus desenvolvedores através de mim!`)
    };

    if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Você não pode banir esse usuário! Ele / ela tem um papel mais importante do que o seu`)
    };

    if (!member.bannable){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Não consegui banir aquele usuário!`);
    };

    await message.channel.send(`Tem certeza que deseja banir **${member.user.tag}**? (y/n)`)

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, cancelled the ban command!`);
    };

    await member.send(`**${message.author.tag}** baniu você de ${message.guild.name}!\n**Reason**: ${reason.join(' ') || 'Não especificado.'}`)
    .catch(() => null);

    return member.ban({ reason: `Nyohi Comando Ban: ${message.author.tag}: ${reason.join(' ') || 'Não especificado'}`})
    .then(_member => message.channel.send(`Banido com sucesso **${_member.user.tag}**`))
    .catch(() => message.channel.send(`Falha ao banir **${member.user.tag}**!`));
  }
};
