const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.js");
const text = require('../../util/string');

module.exports = {
  name: 'support',
  aliases: ["suporte"],
  guildOnly: true,
  group: 'bot',
  description: 'Displays various ways to show support for Mai',
  clientPermissions: [ 'EMBED_LINKS' ],
  parameters: [ ],
  examples: [ 'support' ],
  run: async (client, message) => {

    return message.channel.send(
      new MessageEmbed()
      .setColor(Color)
      .setTitle('Apoie Nyohi e seu Desenvolvimento!')
      .setDescription([
        'Nyohi é um bot de código aberto, mas ainda jovem e adolescente, ainda não totalmente amadurecido.',
        'Conforme o bot progride, Nyohi é obrigado a produzir erros indesejáveis',
        'que interfere com suas funções e, portanto, prejudica a funcionalidade.',
        'É bom saber que você está interessado em apoiar Nyohi',
        'Existem várias maneiras de fazer isso..'
      ].join(' '))
      .addFields([
        {
          name: 'Junte-se ao servidor de suporte dele.',
          value: [
            `Juntar-se com ${message.client.guilds.cache.get('764922436457332746').memberCount}`,
            'outras pessoas e participam do servidor de suporte do Nyohi desde o desenvolvimento até a produção,',
            'testar bots, relatar bugs ou adicionar solicitações de recursos e ser atualizado sobre o que está por vir.',
            'entre clicando [aqui](https://discord.gg/gE2hUyGjXk)'
          ].join(' ')
        },{
          name: 'Contribuir para o Repositório.',
          value: [
            'Encontrou alguns bugs? Você sente que pode consertar sozinho? Contribua para o repositório de Nyohi',
            '[aqui](https://github.com/jeverson34/Nyohi) criando um problema ou resolvendo um',
            'Enquanto estiver fazendo isso, siga <@583794054240665601> ou adicione uma estrela para',
            'o repositório.'
          ].join(' ')
        },{
          name: 'Enviar Formulários.',
          value: [
            'Claramente, tem muito pouca ou nenhuma quantidade de dados armazenados que ajudam a cumprir suas funções principais.',
            'Isso inclui as imagens para comandos de ação, o conjunto de fotos do próprio Nyohi',
          ].join(' ')
        },{
          name: 'Colaborar.',
          value: [
            'No momento, não há colaboradores dedicados à produção do Nyohi, e mantendo',
            'o bot foi feito exclusivamente pelo <@583794054240665601>. Esta é a razão pela qual algumas atualizações de correção demoram',
            'mais do que o previsto. Se você estiver confiante e ativo o suficiente para ajudar a manter o código, você',
            'entre em contato com <@583794054240665601>'
          ].join(' ')
        },{
          name: 'Vote em Nyohi.',
          value: [
            'Nyohi está disponível em [DiscordBotList](https://discordbotlist.com/bots/nyohi) e',
            '[Top.gg](https://top.gg/bot/782641177408045070). Se você gosta deste bot, por favor vote e saia para fazer',
            'uma revisão. Sua revisão será útil ao fazer alterações no bot. A partir do momento,',
            'não há recompensas implementadas para votação, mas estão sujeitas a alterações.'
          ].join(' ')
        },
      ]).setFooter(`Support | ©️${new Date().getFullYear()} Nyohi`)
    )
  }
}
