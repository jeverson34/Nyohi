const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");
const _ = require('lodash');
const fetch = require('node-fetch');

const text = require('../../util/string');

const badge = ' [MyAnimeList](https://myanimelist.net \'Homepage\')';

module.exports = {
  name: 'character',
  aliases: [ 'anichar' , 'char' , 'c' ],
  cooldown: {
    time: 10000,
    message: 'Você está indo rápido demais. Diminua a velocidade para evitar limitação de taxa!'
  },
  clientPermissions: [ 'EMBED_LINKS' ],
  group: 'anime',
  description: 'Procura um personagem em [MyAnimeList](https://myanimelist.net "Homepage"), ou as informações de caractere de Nyohi se nenhuma consulta for fornecida.',
  parameters: [ 'Search Query' ],
  examples: [
    'character',
    'anichar Mai',
    'anichar Sakuta Azusagawa',
    'char Rio Futaba',
    'c Kaede Azusagawa'
  ],
  run: async (client, message, args) => {

    const query = args.join(' ') || 'Ritsuka Fujimaru';

    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`Procurando por um personagem chamado **${query}** em [MyAnimeList](https://myanimelist.net 'Homepage').`)
    .setThumbnail('https://i.imgur.com/u6ROwvK.gif')

    const msg = await message.channel.send(embed);

    let data = await fetch(`https://api.jikan.moe/v3/search/character?q=${encodeURI(query)}&page=1`).then(res => res.json());

    const errstatus = {
      "404": `Nenhum resultado foi encontrado para **${query}**!\n\nSe você acredita que esse personagem existe, tente seus nomes alternativos.`,
      "429": `Estou tendo uma taxa limitada em ${badge}. Por favor, tente novamente mais tarde`,
      "500": `Não foi possível acessar ${badge}. O site pode estar fora do ar no momento`,
      "503": `Não foi possível acessar ${badge}. O site pode estar fora do ar no momento`,
    }

    embed.setColor('RED')
    .setAuthor(data.status == 404 ? 'Nenhum encontrado' : 'Erro de Resposta','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(`**${message.member.displayName}**, ${errstatus[data.status] || `${badge} respondeu com código de erro HTTP ${data.status}`}`)
    .setThumbnail('https://i.imgur.com/qkBQB8V.png');

    if (!data || data.error){
      return await msg.edit(embed).catch(()=>null) || message.channel.send(embed);
    };

    const { results : [ { mal_id } ] } = data;

    let res = await fetch(`https://api.jikan.moe/v3/character/${mal_id}`)
    .then(res => res.json())
    .catch(() => {});

    embed.setDescription(`**${message.member.displayName}**, ${errstatus[data.status] || `${badge} respondeu com código de erro HTTP ${data.status}`}`);

    if (!res || res.error){
      return await msg.edit(embed).catch(()=>{}) || message.channel.send(embed);
    };

    const elapsed = Date.now() - msg.createdAt;
    const [ anime, manga ] = ['animeography', 'mangaography'].map(props => {
      const data = res[props].map(x => {
        const url = x.url.split('/').slice(0,5).join('/');
        return '[' + x.name + '](' + url + ') (' + x.role + ')';
      });
      return text.joinArrayAndLimit(data, 1000, ' • ');
    });
    const mediastore = { anime, manga };

    embed.setAuthor(`${res.name} ${res.name_kanji ? `• ${res.name_kanji}` : ''}`, null, res.url)
    .setThumbnail(res.image_url)
    .setColor(Color)
    .setDescription(text.truncate(res.about.replace(/\\n/g,''),500,`... [consulte Mais informação](${res.url})`))

    return await msg.edit(embed).catch(()=>null) || message.channel.send(embed);
  }
};
