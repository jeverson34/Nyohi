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
const db = require("wio.db");
const canvas = require("discord-canvas");
const client = new Discord.Client();
const { Default_Prefix, Token, Color, Support, Owner, WelcomeImage, LeaveImage } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const config = require("./config.js")















let modules = ["Config", "Other", "Anime", "Fun", "Utility", "Moderation", "Action", "Animais", "Nsfw"];

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


client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;

  let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  

  try {
    if (command) {
      command.run(client, message, args);
    }
  } catch (error) {
    return message.channel.send(`Something Went Wrong, Try Again Later!`);
  }
});



client.on("guildMemberAdd", async member => {
  let Channel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
  if (!Message) Message = `Welcome To The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.toLowerCase().replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
  let Welcomed = new canvas.Welcome();
  let Image = await Welcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(WelcomeImage || "https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg")
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  return client.channels.cache.get(Channel).send(Msg, Attachment);
});

client.on("guildMemberRemove", async member => {
  let Channel = await db.fetch(`Leave_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db.fetch(`Leave_${member.guild.id}_Msg`);
  if (!Message) Message = `${member.user.username} Has Left The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.toLowerCase().replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
  let Leaved = new canvas.Goodbye();
  let Image = await Leaved
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(LeaveImage || "https://images.wallpaperscraft.com/image/cat_night_lights_74375_1280x720.jpg")
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  return client.channels.cache.get(Channel).send(Msg, Attachment);
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


 
 

 
 
 
client.on("ready", () => {
  let activities = [
      `Utilize ${Default_Prefix}help para obter ajuda `,
      `${client.guilds.cache.size} servidores! `,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`,

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