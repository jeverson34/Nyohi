const Discord = require('discord.js')

module.exports = {
  name: 'slowmode',
  aliases: [ '' ],
  guildOnly: true,
  permissions: [ 'BAN_MEMBERS' ],
  clientPermissions: [ 'BAN_MEMBERS' ],
  group: 'moderation',
  description: `ativar o modo lento no canal`,
  examples: [
    'Slowmode 10'
  ],
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Você não tem permissão para usar este comando`);
    message.channel.setRateLimitPerUser(args[0])
    message.reply(`o tempo do Slowmode alterado com sucesso para ${args[0]} segundos!`)
}
};