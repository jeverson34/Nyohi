module.exports = {
  name: 'nuke',
  aliases: [ 'clearall' ],
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

    await message.channel.send(`Isso removerá todas as conversas neste canal e pode causar conflito para bots usando ID para rastrear canais. Continuar?`);

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no','s','sim','não'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes','s','sim'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send(`\\❌ | **${message.author.tag}**, você cancelou o comando nuke!`);
    };

    return message.channel.send(`<a:verificado:808034189290897409> A bomba nuclear foi implantada, dizendo adeus a **#${message.channel.name}** em <a:minutes:807860467367542834>`)
    .then(() => setTimeout(() => message.channel.clone()
    .then(() => message.channel.delete().catch(() => null)), 10000))
  }
};
