const { MessageEmbed, GuildEmoji } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
const { Color } = require("../../config.js");

const Paginate = require('../../struct/Paginate');
const text = require('../../util/string');
const weekdays = require('../../util/constants').weeks;

module.exports = {
  name: 'schedule',
  aliases: [ 'anitoday' , 'airinglist' , 'airing' ],
  guildOnly: true,
  cooldown: {
    time: 60000
    , message: 'Você está indo rápido demais! Diminua a velocidade para evitar limitação de taxa!'
  },
  clientPermissions: [ 'EMBED_LINKS' , 'ADD_REACTIONS' , 'USE_EXTERNAL_EMOJIS' ],
  group: 'anime',
  description: 'Displays the list of currently airing anime for today\'s date or given weekday.',
  parameters: [ 'Weekday' ],
  examples: [
    'schedule monday',
    'anitoday',
    'airinglist sunday',
    'airing saturday'
  ],
  run: async (client, message, [ day ]) => {

    if (!day || !weekdays.includes(day.toLowerCase())){
      day = weekdays[new Date().getDay()]
    };

    const embed = new MessageEmbed()
    .setColor('RED')
    .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
    .setDescription(`\u200B\n Buscando **${day}** horários de anime de [MyAnimeList](https://myanimelist.net 'MyAnimeList Homepage').\n\u200B`)
    .setFooter(`Agendar consulta com Nyohi | \©️${new Date().getFullYear()} Nyohi`)

    let msg = await message.channel.send(embed)

    let res = await fetch(`https://api.jikan.moe/v3/schedule/${day}`).then(res => res.json())

    if (!res || res.error){
      res = res ? res : {};

      embed.setColor('RED')
      .setAuthor(res.error === 'Pedido ruim' ? 'Dia desconhecido' : 'Erro de Resposta','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
      .setDescription([
        `**${message.member.displayName}**, ${res.error === 'Pedido ruim' ? 'Não foi possível reconhecer a entrada' : 'Ocorreu um erro inesperado!'}\n\n`,
        `${res.error === 'Pedido ruim' ? `**${day}** parece ser um dia inválido, selecione de segunda a domingo.` : jikanError(res.status)}`
      ].join(''))
      .setThumbnail('https://i.imgur.com/qkBQB8V.png');

      return await msg.edit(embed).catch(()=>null) || await message.channel.send(embed);
    };

    const elapsed = Date.now() - message.createdTimestamp
    const pages = new Paginate()

    for ( const info of res[day] ){
      pages.add(
        new MessageEmbed()
        .setColor(Color)
        .setThumbnail(info.image_url)
        .setDescription([
          `${info.score ? `**Ponto**:\u2000${info.score}\n`: ''}`,
          `${info.genres.map(x => `[${x.name}](${x.url})`).join(' • ')}\n\n`,
          `${text.truncate(info.synopsis,300,`...[consulte Mais informação](${info.url})`)}`
        ].join(''))
        .setAuthor(info.title, null, info.url)
        .setFooter([
          `Duração da pesquisa: ${Math.abs(elapsed / 1000).toFixed(2)} segundos`,
          `Página ${pages.size === null ? 1 : pages.size + 1} of ${res[day].length}`,
          `Agendar consulta com Nyohi | \©️${new Date().getFullYear()} Nyohi`
        ].join('\u2000\u2000•\u2000\u2000'))
        .addFields([
          { name: 'Tipo',      value: info.type || 'Desconhecido', inline: true },
          { name: 'Começado',   value: moment(info.airing_start).format('dddd, do MMMM YYYY'), inline: true },
          { name: 'Fonte',    value: info.source || 'Desconhecido' , inline: true },
          { name: 'Produtores', value: info.producers.map(x => `[${x.name}](${x.url})`).join(' • ') || 'Nenhum', inline: true },
          { name: 'Licenciantes', value: info.licensors.join(' • ') || 'Nenhum', inline: true },
          { name: '\u200b',    value: '\u200b',   inline: true }
        ])
      );
    };

    msg = await msg.edit(pages.currentPage).catch(()=>null) || await message.channel.send(pages.currentPage);

    if (pages.size === 1){
      return;
    };

    const prev = client.emojis.cache.get('788136610998911046') || '◀'
    const next = client.emojis.cache.get('788136540035481651') || '▶'
    const terminate = client.emojis.cache.get('767062250279927818') || '❌'

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
}
