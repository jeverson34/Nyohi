const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "howgay",
  aliases: "",
  category: "fun",
  description: "Show How Member Gay Is!",
  usage: "Howgay <Mention Member>",
  run: async (client, message, args) => {
    //Start

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Gay v2 Machine`)
      .setDescription(`${Member.username} Is ${Result}% Gay 🏳️‍🌈`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};