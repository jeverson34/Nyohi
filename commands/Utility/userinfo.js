const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");
const moment = require('moment');
moment.locale('pt-br')

module.exports = {
  name: 'userinfo',
  aliases: ['whois', 'user'],
  guildOnly: true,
  group: "utility",
  description: 'Fetch User Information (As of May 20, 2020 - The global function has been removed due to a possible violation to Discord ToS).',
  parameters: [ 'User Mention/ID' ],
  examples: [
    'userinfo @user',
    'whois 75869504958675123'
  ],
  run: async(client, message, [member='']) => {

    if (!member.match(/\d{17,19}/)){
      member = message.author.id
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ | ${message.author}, Não foi possível encontrar esse usuário neste servidor!`);
    };

    const user = member.user;
    const userFlags = await user.fetchFlags()
    .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
    .then(flags => flags.map(([key, _]) => client.emojis.cache.find(x => x.name === key).toString() || key))
    .catch(() => []);

    if (message.guild.ownerID === user.id){
      userFlags.push('<a:dono:809477601638219807>')
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || Color)
      .setAuthor(`Usuário Discord ${user.tag}`, null, 'https://discord.com/')
      .setDescription(userFlags.join(' '))
      .setThumbnail(user.displayAvatarURL({format: 'png', dynamic: true}))
      .addFields([
        { name: 'Nome do usuário', value: `**${user.username}**#${user.discriminator}`, inline: true },
        { name: 'Tipo', value: user.bot ? 'Bot' : 'User', inline: true },
        { name: 'Entrou no Discord', value: moment(user.createdAt).format('dddd, do MMMM YYYY') },
        { name: `Cargos [${member.roles.cache.size - 1}]`, value: member.roles.cache.filter(r => r.id !== message.guild.id).map(x => `${x}`).splice(0,50).join(' ') || '\u200b'}
      ])
    );
  }
};
