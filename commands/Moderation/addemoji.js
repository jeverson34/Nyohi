module.exports = {
  name: 'addemoji',
  aliases: [],
  guildOnly: true,
  permissions: [ 'MANAGE_EMOJIS' ],
  clientPermissions: [ 'MANAGE_EMOJIS' ],
  group: 'moderation',
  description: 'Add an emoji to the server using the supplied image URL and name (optional)',
  parameters: [ 'Image URL', 'Emoji Name' ],
  examples: [
    'addemoji https://some-url/path-to-image.format emojiname'
  ],
  run: (client, message, [url, name] ) => {

    if (!url || !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(url)){
      return message.channel.send(`${message.author}, forneça um link de imagem válido!`);
    };

    return message.guild.emojis.create(url, name || 'emoji')
    .then(emoji => message.channel.send(`Emoji criado com sucesso <a:verificado:808034189290897409> **${emoji.name}** | ${emoji}`))
    .catch(err => message.channel.send(` ${message.author}, ${err.message.replace(`corpo invalido da\nimage:`,'')}.`));
  }
};
