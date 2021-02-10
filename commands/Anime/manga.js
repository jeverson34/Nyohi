const { MessageEmbed, GuildEmoji } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');
const { Color } = require("../../config.js");


const Pages = require('../../struct/Paginate');
const text = require('../../util/string');

module.exports = {
  name: "manga",
  aliases: [ 'comic', 'manhwa', 'manhua' ],
  guildOnly: true,
  cooldown: {
    time: 10000,
    message: 'Ops! Você está indo rápido demais! Diminua a velocidade para evitar limitação de taxa!'
  },
  clientPermissions: [ 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'],
  group: 'anime',
  description: 'Searches for a Manga / Manhwa / Manhua in <:mal:767062339177676800> [MyAnimeList](https://myanimelist.net.co "Homepage"), or shows Seishun Buta Yarou if no query is provided.',
  parameters: [ 'Search Query' ],
  examples: [
    'manga',
    'comic rascal does not dream',
    'manhwa solo leveling',
    'manhua king\'s avatar'
  ],
  run: async (client, message, args) => {

    const query = args.join(' ') || 'Fate/Grand Order';

    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`Procurando mangá com título **${query}** em [MyAnimeList](https://myanimelist.net).`)
    .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
    .setFooter(`Consulta de mangá com Nyohi | \©️${new Date().getFullYear()} Nyohi`);

    let msg = await message.channel.send(embed);

    const data = await fetch(`https://api.jikan.moe/v3/search/manga?q=${encodeURI(query)}&page=1`).then( res => res.json())

    embed.setColor('RED').setAuthor(
        !data.error && !data.results.length
        ? 'Nenhum encontrado'
        : 'Erro de Resposta'
        ,'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1'
      ).setDescription(
        !data.error && !data.results.length
        ? [
          `**${message.member.displayName}**, Nenhum resultado foi encontrado para **${query}**!\n`,
          `Se você acredita que este mangá existe, tente os seguintes métodos:`,
          `• Experimente os nomes alternativos (por exemplo, inglês, nativo, romaji).`,
          `• Inclui o número do volume (se existir).`
        ].join('\n')
        : `[MyAnimeList](https://myanimelist.net 'Homepage') respondeu com código de erro ${data.status}.`
      );

    if (!data || data.error || !data.results.length){
      return await msg.edit(embed).catch(()=> null) || message.channel.send(embed);
    };

    const elapsed = Date.now() - message.createdAt;
    const pages = new Pages();

    for (const res of data.results.slice(0,10)) {
      pages.add(
        new MessageEmbed()
        .setAuthor(res.title, res.image_url, res.url)
        .setColor(Color)
        .setThumbnail(res.image_url)
        .setFooter([
          `Duração da pesquisa: ${Math.abs(elapsed / 1000).toFixed(2)} segundos`,
          `Página ${pages.size + 1} do ${data.results.slice(0,10).length}`,
          `Consulta de mangá com Nyohi | \©️${new Date().getFullYear()} Nyohi`
        ].join('\u2000\u2000•\u2000\u2000'))
        .addFields([
          { name: 'Tipo', value: res.type, inline: true },
          { name: 'Status', value: res.publishing ? 'Publicação' : 'Acabado', inline: true},
          { name: 'Capítulos', value: res.chapters, inline: true },
          { name: 'Membros', value: text.commatize(res.members), inline: true },
          { name: 'Ponto', value: res.score, inline: true },
          { name: 'Volumes', value: res.volumes, inline: true },
          { name: 'Data de início', value: moment(res.start_date).format('dddd, Do MMMM YYYY'), inline: true },
          { name: 'Data final', value: res.end_date ? moment(res.end_date).format('dddd, Do MMMM YYYY') : 'Desconhecido', inline: true },
          { name: '\u200b', value: res.synopsis || '\u200b', inline: false }
        ])
      );
    }

    msg = await msg.edit(pages.firstPage).catch(()=>null) || await message.channel.send(pages.firstPage);

    if (pages.size === 1){
      return;
    };

    const prev = client.emojis.cache.get('788136610998911046') || '◀';
    const next = client.emojis.cache.get('788136540035481651') || '▶';
    const terminate = client.emojis.cache.get('767062250279927818') || '❌';

    const filter = (_, user) => user.id === message.author.id;
    const collector = msg.createReactionCollector(filter);
    const navigators = [ prev, next, terminate ];
    let timeout = setTimeout(()=> collector.stop(), 90000);

    for (let i = 0; i < navigators.length; i++) {
      await msg.react(navigators[i]);
    };

    collector.on('collect', async reaction => {

      switch(reaction.emoji.name){
        case prev instanceof GuildEmoji ? prev.name : prev:
          msg.edit(pages.previous());
        break;
        case next instanceof GuildEmoji ? next.name : next:
          msg.edit(pages.next());
        break;
        case terminate instanceof GuildEmoji ? terminate.name : terminate:
          collector.stop();
        break;
      };

      await reaction.users.remove(message.author.id);
      timeout.refresh();
    });

  collector.on('end', async () => await msg.reactions.removeAll());

  }
};
