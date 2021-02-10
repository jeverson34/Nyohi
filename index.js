const Discord = require("discord.js");
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const fs = require("fs");
const canvas = require("discord-canvas");
const client = new Discord.Client();
const { Default_Prefix, Token, Color, Support, Owner, WelcomeImage, LeaveImage } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const config = require("./config.js")

client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
  client.user.setActivity(`New Members!`, { type: "WATCHING" });
});

let modules = ["Config", "Other", "Anime", "Fun", "Utility", "Moderation"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(error, files) {
    if (error) return new Error(`${error}`);
    files.forEach(function(file) {
      if (!file.endsWith(".js"))
        throw new Error(`A File Does Not End With .js!`);
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async (message) => {
    if(message.author.bot) return;
    let substringArray = get_substrings_between(message.content, ":", ":");
    let msg = message.content;
    if(!substringArray.length) return;

    substringArray.forEach(m => {
        let emoji = client.emojis.cache.find(x => x.name === m);
        var replace = `:${m}:`;
        var rexreplace = new RegExp(replace, 'g');

        if(emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<a${replace}${emoji.id}>`)) msg = msg.replace(rexreplace, emoji.toString());
    })
    

    if(msg === message.content) return;

    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === "NQN2");

    if(!webhook) {
        webhook = await message.channel.createWebhook(`NQN2`, {
            avatar: client.user.displayAvatarURL({dynamic: true})
        });
    }

    await webhook.edit({
        name: message.member.nickname ? message.member.nickname : message.author.username,
        avatar: message.author.displayAvatarURL({dynamic: true})
    })

    message.delete().catch(m => {})

    webhook.send(msg).catch( m => {});

    await webhook.edit({
        name: `NQN2`,
        avatar: client.user.displayAvatarURL({dynamic:true})
    })

 
})





//--------------------------------------------------- F U N C T I O N S --------------------------------------

function get_substrings_between(str, startDelimiter, endDelimiter) {
    var contents = [];
    var startDelimiterLength = startDelimiter.length;
    var endDelimiterLength = endDelimiter.length;
    var startFrom = contentStart = contentEnd = 0;
  
    while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
      contentStart += startDelimiterLength;
      contentEnd = strpos(str, endDelimiter, contentStart);
      if (false === contentEnd) {
        break;
      }
      contents.push(str.substr(contentStart, contentEnd - contentStart));
      startFrom = contentEnd + endDelimiterLength;
    }
  
    return contents;
  }
  
  
  function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
  }


client.on("guildMemberAdd", async (member) => {
 
 let guild = await client.guilds.cache.get("764922436457332746"); 
 let channel = await client.channels.cache.get("768124995150282822");
 let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "ruby");
 let emoji2 = await member.guild.emojis.cache.find(emoji => emoji.name === "flame_puple");
 let emoji3 = await member.guild.emojis.cache.find(emoji => emoji.name === "polar_bear_dance");
 
 if (guild != member.guild) {
   return console.log("Alguem entrou em um servidor mais n foi em Nyohi.");
  } else {
     let embed = await new Discord.MessageEmbed()
     .setColor("#ff0101")
     .setAuthor(member.user.tag, member.user.displayAvatarURL())
     .setTitle(`${emoji}${emoji2}${emoji3} Boas-vindas ${emoji3}${emoji2}${emoji}`)
     .setImage("https://i.pinimg.com/originals/5c/5b/64/5c5b64a1fe6f9f7835cfb4fb78990ce0.gif")
     .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
     .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
     .setFooter('ID do usuario ' + member.user.id)
     .setTimestamp();
 
   channel.send(embed);
 }
});
 
client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("764922436457332746");
  let channel = await client.channels.cache.get("768124995150282822");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "WumpusSadCry");
  if (guild != member.guild) {
    return console.log("Algum membro saiu do servidor. Mas não é no nyohi, então tá tudo bem :)");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Adeus... ${emoji}`)
      .setImage("https://i.pinimg.com/originals/03/f2/08/03f208345666f77565b3f7536f95466e.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter('ID do usuario ' + member.user.id)
      .setTimestamp();

    channel.send(embed);
  }
});


 
 
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
 
 
   const args = message.content
       .trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();
 
   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
 }
});
 
 
 
client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda `,
      `${client.guilds.cache.size} servidores! `,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`,
      `Eu tenho 223 comandos`,
      `Eu fui feito pelos 🌙 Criminals O͢͢͢f Blood ☠`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .catch(console.error);
      
console.log("Estou Online!");
});



client.login(Token).catch(() => console.log(`Invalid Token Is Provided - Please Give Valid Token!`));