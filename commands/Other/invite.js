const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");
const phrase = () => {
  const p = [
      'Adicione-me ao seu servidor com este link!',
      'Obrigado por querer me enviar para o seu servidor!!',
      'Convide-me!',
      'Olá obrigado',
      'Eu adoraria estar no seu servidor!',
      'O que é um servidor? Claro!',
      'Por favor, me convide para o seu servidor'
  ];
  return p[Math.floor(Math.random() * p.length)];
};

module.exports = {
  name: 'invite',
  aliases: ["inv", "i"],
  guildOnly: true,
  group: 'bot',
  description: 'Gives you the invite link',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'invite'
  ],
  run: async (client, message) => {

    const guild_invite = await message.guild.fetchInvites().then(g => {
      if (!g.size){
        return { url: 'Atualmente não há links de convite vinculados a este servidor.' };
      } else {
        return g.first();
      };
    }).catch(() => { return {};});

    return message.channel.send(
      new MessageEmbed()
      .setAuthor(phrase())
      .setColor(Color)
      .setTitle('Convide Nyohi. Selecione um dos seguintes conjuntos de permissões que melhor se adequam a ela em seu servidor.')
      .addFields([
        {
          name: '\u200b', inline: true,
          value: [
            '[**Convite padrão**](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=2117463127&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)',
            '[<a:verificado:808034189290897409>](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=2117463127&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot) Convite padrão de Nyohi.\n',
          ].join('\n')
        },{
          name: '\u200b', inline: true,
          value: [
            '[**Convite recomendado**](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=1342696567&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)',
            '<a:verificado:808034189290897409> Este convite concede a Nyohi todas as permissões necessárias para que todas as suas funções funcionem.\n',
          ].join('\n')
        },{
          name: '\u200b', inline: true,
          value: [
            '[**Permissões totais**](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)',
            '<a:verificado:808034189290897409> Este convite concede a Nyohi os privilégios de `ADMINISTRADOR`.\n',
          ].join('\n')
        },{
          name: '\u200b', inline: true,
          value: [
            '[**Sem privilégios de moderador**](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=519249&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)',
            '<a:verificado:808034189290897409> Este convite remove a permissão de Nyohi para moderar o servidor e seus membros.\n',
          ].join('\n')
        },{
          name: '\u200b', inline: true,
          value: [
            '[**Permissões Básicas**](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=379968&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)',
            '<a:verificado:808034189290897409> A permissão mais básica para os comandos básicos do Nyohi funcionarem.'
          ].join('\n')
        },{
          name: '\u200b', inline: true,
          value: '\u200b'
        },{
          name: '\u200b\n**Ou obtenha o link de convite para este servidor..**', inline: true,
          value: guild_invite.url || '`Não foi possível obter o link de convite do servidor (Requer Gerenciar Permissões de Guilda).`'
        },{
          name: '\u200b\n**Ou aquele para servidor de suporte Nyohi~**', inline: true,
          value: 'https://discord.gg/gE2hUyGjXk'
        }
      ])
      .setFooter(`Invite | ©️${new Date().getFullYear()} Nyohi`)
    );
  }
};
