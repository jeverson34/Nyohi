const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
moment.locale('pt-br')
const { Color } = require("../../config.js");



module.exports = {
  name: "botinfo",
  aliases: ["botinfo", "bot"],
  category: "Utility",
  description: "Envia informações detalhadas sobre o cliente",
  usage: "botinfo",
  run: async (client, message, args) => {
  //command
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username)
          .setTitle("__**Estatísticas:**__")
          .setColor(Color)
          .addField("⏳ Uso Mem", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("⌚️ Tempo de atividade ", `${duration}`, true)
          .addField("📁 Usuarios", `${client.users.cache.size}`, true)
          .addField("📁 Servers", `${client.guilds.cache.size}`, true)
          .addField("📁 Canais", `${client.channels.cache.size}`, true)
          .addField("👾 Discord.js", `v${version}`, true)
          .addField("🤖 Node", `${process.version}`, true)
          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("🤖 utilização do CPU", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Arch", `\`${os.arch()}\``, true)
          .addField("💻 Plataforma", `\`\`${os.platform()}\`\``, true)
          .addField("Latência API", `${(client.ws.ping)}ms`)  
      message.channel.send(botinfo)
  });
  }
  };