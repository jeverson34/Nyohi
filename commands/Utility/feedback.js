const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { Color } = require("../../config.js");
moment.locale('pt-br')

module.exports = {
  name: 'feedback',
  aliases: [],
  guildOnly: true,
  cooldown: { time: 30000 },
  clientPermissions: [ ],
  group: 'bot',
  description: 'Sends support message to this bot\'s owner (Sakurajimai#6742)',
  parameters: [ 'Feedback Message' ],
  examples: [
    'feedback this command is not working bla bla..'
  ],
  run: async function run(client, message, args ){

    if (!args.length){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Adicione um problema à sua mensagem!`).then(()=>  message.react("💢"));
    };

    if (args.join(' ').length > 1000){
      client.commands.cooldowns.get(this.name).users.delete(message.author.id);
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}, Por favor, faça seu relatório breve e curto! (MAX 1000 caracteres!)`).then(()=>  message.react("💢"));
    };

    const owner = await client.users.fetch('583794054240665601').catch(() => null);

    if (!owner){
      return message.channel.send(`Não foi possível entrar em contato com THEBE$T ☠#3906`);
    };

    return owner.send(
      new MessageEmbed()
      .setColor(Color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
      .setTitle('Re: Feedback/Report')
      .setDescription([
        moment(new Date()).format('dddd, do MMMM YYYY'),
        `${message.guild.name}\u2000|\u2000#${message.channel.name}`,
        `**Guild ID:** ${message.guild.id}\u2000|\u2000\n**Channel ID:** ${message.channel.id}\u2000|\u2000\n**User ID:**${message.author.id}`,
        '\n',
        args.join(' ')
      ].filter(Boolean).join('\n'))
    ).then(() => message.react('✅')).catch(() => message.channel.send('✅ Feedback enviado!'))
    .catch(err => message.channel.send(`THEBE$T ☠#3906 no momento não está aceitando nenhum Feedback via DMs. Em vez disso, você pode entrar no meu servidor de suporte ou criar um problema no meu repositório github para resolver diretamente o seu problema.`));
  }
};
