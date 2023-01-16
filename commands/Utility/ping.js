const Discord = require("discord.js");
const { Color } = require("../../config.json");
module.exports = {
  name: "ping",
  category: "info",
  aliases: "",
  description: "Returns latency and API ping",
  timeout: 10000,
  run: async (bot, message, args) => {
    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setAuthor("Pong!")
        .setDescription(
          `🏓 Pong!\nLatency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`
        )
        .setColor(Color)
        .setFooter(message.author.tag)
        .setTimestamp()
      msg.edit(_);
      msg.edit("\u200B");
    });
  },
};
//Pong ping !!!
