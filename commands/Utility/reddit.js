const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Color } = require("../../config.js");

module.exports = {
  name: 'reddit',
  aliases: [ 'rdt', 'subreddit', 'redd.it', 'fetchreddit' ],
  cooldown: {
    time: 10000,
    message: 'O acesso ao Reddit tem uma taxa limitada a 1 uso por usuário a cada 10 segundos'
  },
  group: 'utility',
  description: 'Fetch a random image from the supplied subreddit',
  parameters: [ 'subreddit' ],
  examples: [
    'reddit churchofmai',
    'rdt seishunbutayarou'
  ],
  run: async (client, message, [subreddit = 'grandorder']) => {

    const embed = new MessageEmbed()
    .setColor('RED')
    .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
    .setDescription(`\u200B\nBuscando informações de <:reddit:808773400368513044> **[r/${subreddit}](https://reddit.com/r/${subreddit})**. Por favor, aguarde.`)

    const prompt = await message.channel.send(embed);
    let res = await fetch(`https://reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .catch(() => null);

    embed.setColor('RED')
    .setThumbnail(null)
    .setAuthor('Subreddit inválido','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(`Isso é inválido / inexistente <:reddit:808773400368513044> subreddit.`);

    if (!res || !res.data.children || !res.data.children.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    res = res.data.children.filter(m => m.data.post_hint === 'image');

    embed.setAuthor('Nenhuma imagem encontrada', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription('este <:reddit:808773400368513044> subreddit não possui postagens de imagens..');

    if (!res.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    if (!message.channel.nsfw){
      res = res.filter(m => !m.data.over_18)
    };

    embed.setAuthor('Subreddit NSFW', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(' Parece que você inseriu um subreddit nsfw em um canal sfw. Por favor, vá para o canal nsfw enquanto usa este subreddit.');

    if (!res.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    const post = res[Math.floor(Math.random() * res.length)].data;

    embed.setColor(Color)
    .setDescription('')
    .setImage(post.url)
    .setTimestamp(post.created_utc * 1000)
    .setTitle(post.title)
    .setURL(`https://www.reddit.com${post.permalink}`)
    .setAuthor('', null);

    return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
  }
};
