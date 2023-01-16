module.exports = {
  name: 'lockdown',
  aliases: [ 'lock', 'ld', 'lockchannel' ],
  guildOnly: true,
  permissions: [ 'MANAGE_MESSAGES', 'MANAGE_CHANNELS' ],
  clientPermissions: [ 'MANAGE_CHANNELS' ],
  group: 'moderation',
  description: `[Impedir / Permitir] que os usuários enviem mensagens no canal atual. As sobregravações de permissão serão perdidas.`,
  examples: [
    'lockdown',
    'lock',
    'ld',
    'lockchannel'
  ],
  run: (client, message) => message.channel.overwritePermissions([
    {
      id: message.guild.roles.everyone.id,
      deny: [ 'SEND_MESSAGES' ].slice(Number(
        !message.channel.permissionsFor(message.guild.roles.everyone)
        .has('SEND_MESSAGES'))),
      allow: [ 'SEND_MESSAGES' ].slice(Number(
        message.channel.permissionsFor(message.guild.roles.everyone)
        .has('SEND_MESSAGES')))
    },
    {
      id: message.guild.me.id,
      allow: [ 'SEND_MESSAGES' ]
    }
  ], `Nyohi Lockdown Command: ${message.author.tag}`)
  .then((ch) => message.channel.send(
    ch.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\✔️ O bloqueio foi iniciado! Apenas usuários com nossas permissões especiais poderão enviar mensagens aqui!'
    : '\\✔️ Bloqueio encerrado! Todos agora podem enviar mensagens neste canal'
  )).catch(() => message.channel.send(
    message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
    ? '\\❌ Incapaz de bloquear este canal!'
    : '\\❌ Incapaz de restaurar este canal!'
  ))
};
