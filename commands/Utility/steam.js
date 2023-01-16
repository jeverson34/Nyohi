const html2md = require('html2markdown');
const { Color } = require("../../config.js");
const { Mac } = require("../../image.js");
const { MessageEmbed } = require('discord.js');
const { decode } = require('he');
const fetch = require('node-fetch');
const text = require('../../util/string');

module.exports = {
  name: 'steam',
  aliases: ["steam"],
  cooldown: {
    time: 10000,
    message: 'O acesso ao Steam tem uma taxa limitada a 1 uso por usuário a cada 10 segundos'
  },
  group: 'utility',
  description: 'Pesquisas <:steam:805240697262178315> [Steam](https://store.steampowered.com/ \'Steam Homepage\') para jogos! ou clube de literatura Doki-doki, se nenhuma consulta for fornecida.',
  parameters: [ 'Search Query' ],
  examples: [
    'steam dota2',
    'steam'
  ],
  run: async (client, message, args) => {

    const query = args.join(' ') || 'Grand Theft Auto V';

    const res = await fetch(`https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(() => null);

    if (!res || !res.total){
      return message.channel.send(`\\❌Não consegui encontrar **${query}** na <:steam:805240697262178315> steam`);
    };

    const body = await fetch (`https://store.steampowered.com/api/appdetails/?cc=us&l=en&appids=${res.items[0].id}`)
    .then(res => res.json())
    .catch(() => null);

    if (!body){
      return message.channel.send(`\\❌ Não consegui encontrar **${query}** na <:steam:805240697262178315> steam`);
    };

    const data = body[res.items[0].id].data;
    const platformLogo = { windows: Mac , mac:Mac, linux: ' <:linux:808051339019943977>' };
    const platformrequirements = { windows: 'pc_requirements', mac: 'mac_requirements', linux: 'linux_requirements' };
    const current = (data.price_overview || 'Free').toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    const original = (data.price_overview || 'Free').toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    const price = current === original ? current : `~~~${original}~~~ ${current}`;
    const platforms = Object.entries(data.platforms).filter(([platform, has]) => has)
    .map(([platform]) => { return {
      name: '\u200b', inline: true,
      value: `${platformLogo[platform]} ${decode(html2md(data[platformrequirements[platform]].minimum)).split('* **Additional Notes:')[0]}`
    }});
    platforms[0].name = 'System Requirements';

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setTitle(data.name)
      .setImage(res.items[0].tiny_image)
      .setURL(`https://store.steampowered.com/app/${data.steam_appid}`)
      .setFooter(`steam | \©️${new Date().getFullYear()} Nyohi`)
      .addFields([
        { name: 'Preço', value: `•\u2000 ${price}`, inline: true },
        { name: 'Metascore', value: `•\u2000 ${data.metacritic ||'???'}`, inline: true },
        { name: 'Data de lançamento', value: `•\u2000 ${data.release_date.data||'???'}`, inline: true },
        { name: 'Desenvolvedores', value: data.developers.map(m => `• ${m}`).join('\n'), inline: true },
        { name: 'Categorias', value: data.categories.map(m => `• ${m.description}`).join('\n'), inline: true },
        { name: 'Gêneros', value: data.genres.map(m => `• ${m.description}`).join('\n'), inline: true },
        { name: '\u200b', value: text.truncate(decode(data.detailed_description.replace(/(<([^>]+)>)/ig,' ')),980)},
        { name: 'Idiomas Suportados', value: `\u2000${text.truncate(html2md(data.supported_languages), 997)}`},
        ...platforms
      ])
    );
  }
};
