const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'clear',
  aliases: [ 'delete', 'slowprune', 'sd', 'slowdelete' ],
  guildOnly: true,
  permissions: [ 'MANAGE_MESSAGES' ],
  clientPermissions: [ 'MANAGE_MESSAGES', 'EMBED_LINKS' ],
  group: 'moderation',
  description: 'Exclua mensagens deste canal. Não excluirá mensagens com mais de duas (2) semanas.',
  parameters: [ 'Quantity of Message' ],
  examples: [
    'clear 10',
    'delete 99',
    'slowprune 50'
  ],
  run: async (client, message, [quantity]) => {

    quantity = Math.round(quantity);

    if (!quantity || quantity < 2 || quantity > 100){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Forneça a quantidade de mensagens a serem excluídas, que deve ser maior que duas (2) e menor que cem (100)`);
    };

    return message.channel.bulkDelete(quantity, true)
    .then(async messages => {

      const count = messages.size;
      const _id = Math.random().toString(36).slice(-7);
      const uploadch = client.channels.cache.get(client.config.channels.uploads);

      messages = messages.filter(Boolean).map(message => {
        return [
          `[${moment(message.createdAt).format('dddd, do MMMM YYYY hh:mm:ss')}]`,
          `${message.author.tag} : ${message.content}\r\n\r\n`
        ].join(' ');
      });

      messages.push(`Messages Cleared on ![](${message.guild.iconURL({size: 32})}) **${message.guild.name}** - **#${message.channel.name}** --\r\n\r\n`);
      messages = messages.reverse().join('');

      const res = uploadch ? await uploadch.send(
        `BULKDELETE FILE - ${message.guild.id} ${message.channel.id}`,
        { files: [{ attachment: Buffer.from(messages), name: `bulkdlt-${_id}.txt`}]}
      ).then(message => [message.attachments.first().url, message.attachments.first().id])
      .catch(() => ['', null]) : ['', null];

      const url = (res[0].match(/\d{17,19}/)||[])[0];
      const id = res[1];

      return message.channel.send(
        `Successfully deleted **${count}** messages from this channel!`,
        new MessageEmbed()
        .setColor('GREY')
        .setDescription([
          `[\`📄 View\`](${url ? `https://txt.discord.website/?txt=${url}/${id}/bulkdlt-${_id}`:''})`,
          `[\`📩 Download\`](${res[0]})`
        ].join('\u2000\u2000•\u2000\u2000'))
      );
    });
  }
}
