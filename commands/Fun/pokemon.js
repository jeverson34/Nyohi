const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Color } = require("../../config.js");

const text = require('../../util/string');

module.exports = {
  name: 'pokemon',
  aliases: [ 'pokedex', 'pokémon', 'pokédex' ],
  group: 'fun',
  description: 'Encontre um pokémon específico usando o pokédex ou pikachu se nenhuma consulta for fornecida.',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'pokemon',
    'pokedex pikachu',
    'pokémon clefairy',
    'pokédex jigglypuff'
  ],
  run: async (client, message, args) => {

    const query = args.join(' ') || 'Pikachu';
    const embed = new MessageEmbed()
    .setColor(Color)

    const prompt = await message.channel.send(
      embed.setDescription(`Searching pokédex for **${query}**`)
      .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
    );

    const data = await fetch(`https://some-random-api.ml/pokedex?pokemon=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(()=>null);

    embed.setColor('RED')
    .setThumbnail(null)
    .setAuthor('Pokédex Unavailable', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription('O provedor da Pokedex respondeu com o erro 5xx. Por favor, tente novamente mais tarde.')

    if (!data){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    embed.setAuthor('A entrada do Pokémon não foi encontrada', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(`**${message.author.tag}**, eu não consigo encontrar **${query}** da Pokédex!`)

    if (data.error){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    data.sprites = data.sprites || {};
    data.stats = data.stats || {};
    data.family.evolutionLine = data.family.evolutionLine || [];

    embed.setColor(Color)
    .setDescription('')
    .setThumbnail(data.sprites.animated || data.sprites.normal || null)
    .setAuthor(`Entrada Pokédex #${data.id} ${data.name.toUpperCase()}`,'https://i.imgur.com/uljbfGR.png', 'https://pokemon.com/us')
    .addFields([
      { name: 'Informações', value: data.description || '???' },
      { name: 'Tipo', value: data.type.join('\n') || '???', inline: true },
      { name: 'Habilidades', value: data.abilities.join('\n') || '???', inline: true },
      {
        name: 'Build', inline: true,
        value: [
          `Altura: **${data.height || '???'}**`,
          `Peso: **${data.weight || '???'}**`,
          `Gênero: **${text.joinArray(data.gender)}**`
        ].join('\n')
      },
      { name: 'Grupos de Ovos', value: data.egg_groups.join('\n') || '???', inline: true },
      {
        name: 'Estatísticas', inline: true,
        value: [
           `HP: **${data.stats.hp || '???'}**`,
           `ATK: **${data.stats.attack || '???'}**`,
           `DEF: **${data.stats.defense || '???'}**`
        ].join('\n')
      },
      {
        name: 'SP.Stats', inline: true,
        value: [
          `SP.ATK: **${data.stats.sp_atk || '???'}**`,
          `SP.DEF: **${data.stats.sp_def || '???'}**`,
          `SPEED: **${data.stats.speed || '???'}**`
        ].join('\n')
      },
      { name: 'Geração', value: data.generation || '???', inline: true },
      { name: 'Estágio de Evolução', value: text.ordinalize(data.family.evolutionStage || '???'), inline: true },
      { name: 'Linha de Evolução', value: data.family.evolutionLine.join(' \\👉 ') || '???', inline: true }
    ]);

    return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
  }
};
