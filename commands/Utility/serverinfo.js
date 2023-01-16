const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const constants = require('../../util/constants.js');
const { Color } = require("../../config.js")

module.exports = {
  name: 'serverinfo',
  aliases: ['server', 'guild', 'serverstat', 'serverstats', 'guildstat', 'guildstats' ],
  group: 'utility',
  guildOnly: true,
  description: 'Mostra as informações básicas do servidor',
  examples: [
    'serverinfo'
  ],
  run: async (client, message) => message.channel.send(
    new MessageEmbed()
    .setColor(Color)
    .setAuthor(`♨️ ${message.guild.name} informação do servidor`, message.guild.iconURL())
    .addFields([
      {
        name: '__**SERVER**__', inline: true,
        value: [
          `**Proprietário**:\u2000${await message.guild.members.fetch(message.guild.ownerID).then(x => x.user.tag)}`,
          `**Região**:\u2000${message.guild.region.split('')[0].toUpperCase() + message.guild.region.slice(1)}`,
          `**Nível de Verificação**:\u2000${constants.verificationlvl[message.guild.verificationLevel]}`,
          `**Boost**:\u2000Nível **${message.guild.premiumTier}** *(${message.guild.premiumSubscriptionCount} boosts)*`
        ].join('\n')
      },{
        name: '__**MEMBROS**__', inline: true,
        value: [
          `**Contagem**:\u2000${message.guild.memberCount}`,
          `**Vaga**:\u2000${250000 - message.guild.memberCount}`,
          `**Percentual de ocupação**:\u2000${(message.guild.memberCount/250000*100).toFixed(2)}%`
        ].join('\n')
      },{
        name: '__**CARGOS**__', inline: true,
        value: [
          `**Contagem**:\u2000${message.guild.roles.cache.size - 1}`,
          `**Slot não utilizado**:\u2000${249 - message.guild.roles.cache.size}`,
          `**Porcentagem usada**:\u2000${(message.guild.roles.cache.size/250*100).toFixed(2)}%`
        ].join('\n')
      },{
        name: '__**EMOJIS (Estático)**__', inline: true,
        value: [
          `**Contagem**:\u2000${message.guild.emojis.cache.filter(x => !x.animated).size}`,
          `**Slot não utilizado**:\u2000${(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))-message.guild.emojis.cache.filter(x=>!x.animated).size}`,
          `**Porcentagem usada**:\u2000${message.guild.emojis.cache.filter(x=>!x.animated).size/(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))*100}%`
        ].join('\n')
      },{
        name: '__**EMOJIS (Animado)**__', inline: true,
        value: [
          `**Contagem**:\u2000${message.guild.emojis.cache.filter(x => x.animated).size}`,
          `**Slot não utilizado**:\u2000${(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))-message.guild.emojis.cache.filter(x=>x.animated).size}`,
          `**Porcentagem usada**:\u2000${message.guild.emojis.cache.filter(x=>x.animated).size/(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))*100}%`
        ].join('\n')
      },{
        name: '__**Canais**__', inline: true,
        value: [
          `**Contagem**:\u2000**Texto**(${message.guild.channels.cache.filter(x=>x.type==='text').size})\u2000**Voz**(${message.guild.channels.cache.filter(x=>x.type==='voice').size})\u2000**Categoria**(${message.guild.channels.cache.filter(x=>x.type==='category').size})`,
          `**Slot não utilizado**:\u2000${500-message.guild.channels.cache.size}`,
          `**Porcentagem usada**:\u2000${(message.guild.emojis.cache.size/500*100).toFixed(2)}%`
        ].join('\n')
      },{
        name: 'Criado',
        value: moment(message.guild.createdAt).format('dddd, do MMMM YYYY')
      }
    ])
  )
};
