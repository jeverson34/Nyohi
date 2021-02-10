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
  if (!Message) Message = `Bem-vindo ao server!`;
  
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


const usersMap = new Map();
const LIMIT = 5;
const TIME = 7000;
const DIFF = 3000;


client.on('message', message => {
  if(message.author.bot) return;
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get('');
        message.member.roles.add(role);
        message.channel.send('Você foi silenciado.');
        setTimeout(() => {
          message.member.roles.remove(role);
          message.channel.send('Você foi reativado');
        }, TIME);
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
});






client.login(Token).catch(() => console.log(`Invalid Token Is Provided - Please Give Valid Token!`));