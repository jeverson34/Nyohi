const { Default_Prefix, Color, Support } = require("../../config.js");
const Discord = require("discord.js");
const { websites } = require('../../config.js')

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Other",
  description: "Bot Help Command ;)",
  usage: "Help | <Command Name>",
  run: async (client, message, args) => {
    
    const Config = client.commands.filter(cmd => cmd.category === "Config").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Other = client.commands.filter(cmd => cmd.category === "Other").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Help!`)
    .setDescription([
          '<:meu:808220153627803658>',
          `🌙 Criminals O͢͢͢f Blood ☠`,
          '<:meu:808220153627803658>\n',
          '\n\u2000•\u2000\u2000[Quem é **Nyohi**](https://myanimelist.net/character/145734/)\n',
          '\u2000•\u2000\u2000[De que anime o ***Nyohi***\u2000é?](https://myanimelist.net/anime/34321/)\n\n',
          `**O que eu posso fazer?**\nPosso ser usado para várias pesquisas de anime, como busca de anime, apimentar o ambiente de bate-papo fornecendo imagens geradas aleatoriamente para várias frases como abraço, tapinha ou soco. Posso gerenciar seu servidor também fornecendo comandos como kick, ban e mute. Também tenho ferramentas para pesquisar coisas aleatórias como jogos da Steam, hex de cor e muito mais!\n\n**O que me torna diferente do outro bot**\nNada é melhor do que um bot de código aberto e gratuito com muitos recursos! Você pode ver todos os meus recursos na página do repositorio com link abaixo.\n\nVeja todos os meu comandos no meu website no link abaixo\n\n\u200b\u2000•\u2000\u2000Todos os meus comandos começam com o prefixo \`${Default_Prefix}\`\n\u2000•\u2000\u2000Use \`${Default_Prefix}listcommands\` ou entre no link abaixo para ver a lista dos meus comandos no meu site\n\u2000•\u2000\u2000Você também pode usar \`${Default_Prefix}help [command]\` para obter ajuda em um comando específico\n\n[\*Repositório\*](https://github.com/jeverson34/Nyohi)\u200b\u2000•\u2000\u2000[\*Website\*](https://Nyohi-site.gamerjf982.repl.co)\u200b\u2000•\u2000\u2000[\*Invite\*](https://discord.com/oauth2/authorize?client_id=782641177408045070&permissions=1342696567&redirect_uri=https%3A%2F%2Fdiscord.gg%2FHD8EDFm&scope=bot)\u200b\u2000•\u2000\u2000[\*Support\*](https://discord.gg/gE2hUyGjXk)\u200b\u2000•\u2000\u2000[\*Top.gg\*](https://top.gg/bot/782641177408045070)\u200b\u2000•\u2000\u2000[\*DBL\*](https://discordbotlist.com/bots/nyohi)`

        ].join(' '))
    .setFooter(`Requerido por ${message.author.username}`)
        

   
    
    if (!args[0]) return message.channel.send(Embed);
    
    let command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    
    if (!command) return message.channel.send(`Nenhum comando encontrado - ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`Informações de comando!`)
    .addField(`Nome`, command.name.charAt(0).toUpperCase() + command.name.slice(1), true)
    .addField(`Categoria`, command.category || command.group ||"Sem categoria", true)
    .addField(`Analises`, command.aliases ? command.aliases.join(", ") : "Sem Analises", true)
    .addField(`Uso`, command.examples, true)
    .addField(`Descrição`, command.description)
    .setFooter(`Requerido por ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embeded);
  }
};