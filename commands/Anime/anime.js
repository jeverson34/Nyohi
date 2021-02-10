const moment = require('moment');
const { getInfoFromName } = require('mal-scraper');
const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");
moment.locale('pt-br')

const { malGenres } = require('../../util/constants');
const text = require('../../util/string');

module.exports = {
  name: 'anime',
  aliases: [ 'ani', 'as', 'anisearch'],
  cooldown: {
    time: 10000,
    message: 'Você está indo rápido demais. Diminua a velocidade para evitar limitação de taxa!'
  },
  clientPermissions: [ 'EMBED_LINKS' ],
  group: 'anime',
  description: 'Searches for a specific anime in <:mal:767062339177676800> [MyAnimeList](https://myanimelist.net "Homepage"), or shows Mai\'s anime series information if no query is provided.',
  parameters: [ 'Search Query' ],
  examples: [
    'anime',
    'as seishun buta yarou',
    'ani aobuta',
    'anisearch bunnygirl senpai'
  ],
  run: async ( client, message, args ) => {

    const query = args.join(' ') || 'Fate/Grand Order';

    // Indicate that the bot is doing something in the background
    message.channel.startTyping();

    const data = await new Promise((resolve,reject) => {
      setTimeout(() => reject('TIMEOUT'), 10000);

      return getInfoFromName(query)
      .then(res => resolve(res))
      .catch(err => reject(err));
    }).catch((err)=> err !== 'TIMEOUT' ? null : err)

    if (!data){
      return message.channel.send([
        `\\❌ **${message.author.tag}**, Nenhum resultado foi encontrado para **${query}**`,
        'Se você acredita que este anime existe, tente os seguintes métodos:',
        '\u2000•\u2000Experimente os nomes alternativos (por exemplo, inglês, nativo, romanizado)',
        '\u2000•\u2000Inclua o número da temporada (se aplicável)',
        '\u2000•\u2000Inclua o tipo (por exemplo, OVA, ONA, Shorts para TV).'
      ].join('\n')).then(() => channel.stopTyping());
    } else if (data === 'TIMEOUT'){
      return message.channel.send([
        `\\❌ **${message.author.tag}**, MyAnimeList demorou mais para responder.`,
        'Tente novamente mais tarde, isso pode ser causado por um tempo de inatividade do servidor.'
      ].join('\n')).then(() => channel.stopTyping());
    };

    message.channel.stopTyping();

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setThumbnail(data.picture || null)
      .setFooter(`Consulta de anime com Nyohi | \©️${new Date().getFullYear()} Nyohi`)
      .setAuthor([
        text.truncate(data.englishTitle || data.title, 200),
        text.truncate(data.type || 'showType Indisponível', 200)
      ].join('\u2000|\u2000'), null, data.url)
      .setDescription([
        data.japaneseTitle,
        [
          `[\\⭐](https://myanimelist.net/info.php?go=topanime 'Ponto'): **${data.score}**`,
          `[\\🏅](https://myanimelist.net/info.php?go=topanime 'Rank'): **${text.ordinalize((data.ranked.replace('N/A','0')).slice(1)).replace(/0th/,'N/A')}**`,
          `[\\✨](https://myanimelist.net/info.php?go=topanime 'Popularidade'): **${data.popularity || '~'}**`,
          `[\` ▶ \`](${data.trailer} 'Assista o trailer')`
        ].join('\u2000\u2000•\u2000\u2000'),
        `\n${text.joinArray(data.genres.map(g =>
          `[**${g}**](https://myanimelist.net/anime/genre/${malGenres[g.toLowerCase()]})`
        )||[])}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ].filter(Boolean).join('\n'))
      .addFields([
        {
          name: '\\🔸 Fonte', inline: true,
          value: '\u2000' + data.source || 'Desconhecido'
        },{
          name: '\\🔸 Episódios', inline: true,
          value: data.episodes || 'Desconhecido'
        },{
          name: '\\🔸 Duração', inline: true,
          value: data.duration || 'Desconhecido'
        },{
          name: '\\🔸 Membros', inline: true,
          value: data.members || 'Desconhecido'
        },{
          name: '\\🔸 Favoritos', inline: true,
          value: data.favorites || 'Desconhecido'
        },{
          name: '\\🔸 Estúdio', inline: true,
          value: data.studios || 'Desconhecido'
        },{
          name: `\\🕐 ${data.status === 'Fim da exibição' ? 'Exibido' : 'Ares'} (*${moment(data.aired.split('to')[0], 'll').fromNow()}*)`,
          value: data.aired || 'Desconhecido'
        },{
          name: '\\🎬 Produtores',
          value: text.joinArray(data.producers||[]) || 'Desconhecido'
        },{
          name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          value: [
            text.truncate(data.synopsis||'Sem sinopse', 500, `...\n\n[\`📖\`](${data.url} 'Leia mais em MyAnimeList')`) || 'Nenhuma sinopse disponível.',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            `**${data.rating.replace('Nenhum', '') || 'Sem classificação'}**`
          ].join('\n')
        }
      ])
    );
  }
};
