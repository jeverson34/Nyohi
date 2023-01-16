module.exports = {
  name: 'softlockdown',
  aliases: [ 'softlock', 'softld', 'softlockchannel' ],
  guildOnly: true,
  permissions: [ 'MANAGE_MESSAGES', 'MANAGE_CHANNELS' ],
  clientPermissions: [ 'MANAGE_CHANNELS' ],
  group: 'moderation',
  description: `[Prevenir / Permitir] que usuários sem permissões especiais enviem mensagens no canal atual. As sobregravações de permissão serão mantidas.`,
  examples: [
    'softlockdown',
    'softlock'
  ],
  run: (client, message) => message.channel.updateOverwrite(
    message.guild.roles.everyone,
    {
      SEND_MESSAGES: !message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    },
    `Nyohi Soft-Lockdown Command: ${message.author.tag}`)
  .then((ch) => message.channel.updateOverwrite(client.user, { SEND_MESSAGES: true }))
  .then((ch) => message.channel.send(
    ch.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\✔️  Bloqueio encerrado! Todos agora podem enviar mensagens neste canal'
    : '\\✔️ O bloqueio foi iniciado! Usuários sem funções ou permissões especiais não poderão enviar mensagens aqui!'
  )).catch(() => message.channel.send(
    message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\❌ Incapaz de bloquear suavemente este canal!'
    : '\\❌ Incapaz de restaurar este canal!'
  ))
};
