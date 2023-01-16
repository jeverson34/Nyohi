const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");


module.exports = {
  name: "hack",
  aliases: "",
  category: "fun",
  description: "Hack Member!",
  usage: "Hack <Mention Member>",
  accessableby: "everyone",
  run: async (client, message, args) => {
    //Start

    let pass = Math.floor(Math.random() * 16);
    
    let email = [
      "gmail.com",
      "email.com",
      "outlook.com",
      "hotmail.com",
      "mail.com",
      "yahoo.com",
      "gmx.com",
      "aol.com",
      "fastmail.com",
      "yandex.com",
      "protonmail.com",
      "hushmail.com"
    ]
    
    let emails = email[Math.floor(Math.random() * email.length)]

    let passwords = Math.random()
      .toString(36)
      .toLowerCase()
      .substr(2, pass);

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    if (!Member)
      return message.channel.send(
        `Mencione um membro que você deseja hackear!`
      );

    if (Member.id === message.author.id)
      return message.channel.send(`Você não pode hackear a si mesmo!`);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Status do hack: concluído`)
      .setDescription(
        `Name: ${Member.username} | ID: ${
          Member.id
        } | Email: ${Member.username + pass}@${emails} | Password: ${passwords}`
      )
      .setFooter(`N leve isso a serio e tudo gerado aleatoriamente!`)
      .setTimestamp();

    await message.channel.send(`Hack iniciado! Hackiando ${Member.username}`);

    await message.channel.send(`Hack Status: 10%`);

    await message.channel.send(`Hack Status: 20%`);

    await message.channel.send(`Hack Status: 30%`);

    await message.channel.send(`Hack Status: 40%`);

    await message.channel.send(`Hack Status: 50%`);

    await message.channel.send(`Hack Status: 60%`);

    await message.channel.send(`Hack Status: 70%`);

    await message.channel.send(`Hack Status: 80%`);

    await message.channel.send(`Hack Status: 90%`);

    setTimeout(function() {
      message.channel.send(embed);
    }, 5000);

    //End
  }
};