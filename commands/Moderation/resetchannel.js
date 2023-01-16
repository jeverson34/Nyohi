module.exports = {
  name: 'resetchannel',
  aliases: [ 'resetch' ],
  guildOnly: true,
  permissions: [ 'MANAGE_CHANNELS' ],
  clientPermissions: [ 'MANAGE_CHANNELS' ],
  group: 'moderation',
  description: `Remove todas as substituições de permissão e redefine as permissões @everyone para \`unset\``,
  examples: [
    'resetchannel',
    'resetch'
  ],
  run: (client, message) => message.channel.overwritePermissions([
    { id: message.guild.roles.everyone.id }
  ])
  .then(ch => message.channel.send('\\✔️ Redefinir com sucesso as permissões para este canal.'))
  .catch(() => message.channel.send('\\❌ Não é possível redefinir as permissões para este canal.'))
};
