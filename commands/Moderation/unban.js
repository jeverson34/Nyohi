module.exports = {
  name: 'unban',
  aliases: [],
  guildOnly: true,
  permissions: [ 'BAN_MEMBERS' ],
  clientPermissions: [ 'BAN_MEMBERS' ],
  group: 'moderation',
  description: 'Unbans a user from this server',
  parameters: [ 'user Mention/ID', 'Unban Reason' ],
  examples: [
    'unban 728374657483920192',
  ],
  run: async (client, message, [ user = '', ...args ]) => {

    if (!user.match(/\d{17,19}/)){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Please provide the ID of the user to unban`);
    };

    user = user.match(/\d{17,19}/)[0];

    return message.guild.members.unban(user, { reason: `Nyohi Unbans: ${message.author.tag}: ${args.join(' ') || 'None'}`})
    .then(user => message.channel.send(`\\✔️ Desbanido com sucesso **${user.tag}**!`))
    .catch(() => message.channel.send(`\\❌ Não é possível cancelar o banimento do usuário com ID ${user}. O argumento fornecido pode não ser um ID de usuário válido ou o usuário não foi banido.`));
  }
};
