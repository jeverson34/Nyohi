module.exports = {
  name: 'softnuke',
  aliases: [ 'sn' ],
  guildOnly: true,
  permissions: [ 'MANAGE_MESSAGES', 'MANAGE_CHANNELS' ],
  clientPermissions: [ 'MANAGE_CHANNELS' ],
  group: 'moderation',
  description: 'Removes all messages in the channel (Deletes the old channel and makes a copy of it with permissions intact)',
  examples: [
    'nuke',
    'clearall'
  ],
  run: async (client, message) => {
 

    return message.channel.send(`<a:verificado:808034189290897409> A bomba nuclear foi implantada, dizendo adeus a **#${message.channel.name}** `)
    .then(() => setTimeout(() => message.channel.clone()
    .then(() => message.channel.delete().catch(() => null)), 100))
  }
};
