const Discord = require("discord.js");
const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "<:Bravery:734515839180603413>",
  HOUSE_BRILLIANCE: "<:Brilliance:734515799238246462>",
  HOUSE_BALANCE: "<:Balance:734515830913630329>",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};
module.exports = {
  name: "trivia",
  description: "Teste seu conhecimento!",
  category: "fun",
  aliases: '',
  run: async (client, message, [target]) => {
  const sv = message.content.slice(process.config.prefix).split(" ");
  if (sv[1] === "server") {
    //info server!
    const level = ["None", "Low", "Medium", "High", "Max"];
    let description = [
      "** Server**",
      `**❯ Name: **` + message.guild.name,
      `**❯ Owner: **` + message.guild.owner.user.tag,
      `**❯ ID: **` + message.guild.id,
      `**❯ Avatar:** [Download](${message.guild.iconURL({
        dynamic: true,
      })})`,
      `**❯ Members: **` + message.guild.memberCount,
      `**❯ Bots: **` +
        message.guild.members.cache.filter((mem) => mem.user.bot === true).size,
      `**❯ Roles: **` + message.guild.roles.cache.size,
      `**❯ Security level: **` + message.guild.verificationLevel,
      `**❯ Created at: **` +
        moment.utc(message.guild.createdAt).format("dddd, MMMM, Do, YYYY"),
      `**❯ Online: **` +
        message.guild.members.cache.filter(
          (mem) => mem.user.presence.status != "offline"
        ).size,
    ];

    const emebed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setColor("RANDOM")
      .setDescription(description);

    return message.channel.send(emebed);
  }

  if (sv[1] === "bot") {
    //? Prefix
    const dev = client.users.cache.get("583794054240665601");
    const devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });

    const kaori = client.users.cache.get(client.user.id);
    const kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });

    const sobre = [
      "**❯Command list:** `/help`\n",
      "**Statics ↗️**",
      `**❯Servers:** ${client.guilds.cache.size}`,
      `**❯Channels:** ${client.channels.cache.size}\n`,
      "**Software ⚙️**",
      `**❯Size:** 150 Mg`,
      `**❯Library:** Discord.Js`,
      `**❯Version Discord.Js:** 12.3.1`,
      `**❯Version Node.Js:** 12.16.3\n`,
      `**Support me 👇**`,
      `<:github:760606165016117298> [Give me a star](${"https://github.com/BestNessPT/BotKaoriDiscord"})`,
      `<:discord:760607139172712520> [Join my server](${"https://discord.gg/wD7T6Ty"})`,
      `<:topggbot:760960068589060106> [Vote me on Top.gg](${"https://top.gg/bot/730092279326441574"})`,
      `💌 [Invite me to your server!](${"https://discord.com/api/oauth2/authorize?client_id=730092279326441574&permissions=8&scope=bot"})`,
    ];

    const Embed = new MessageEmbed()
      .setAuthor("Kaori Miyazono#5192", kaoriavatar)
      .setTitle("About me!")
      .setThumbnail(kaoriavatar)
      .setDescription(sobre)
      .setColor(`RANDOM`);
      //.setFooter(`Dev: ${dev.username}#${dev.discriminator}`, devavatar);
    return message.channel.send(Embed);
  }

  const member =
    message.mentions.members.last() ||
    message.guild.members.cache.get(target) ||
    message.member;

  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  let activity =
    member.user.presence.activities.find((s) =>
      ["PLAYING", "WATCHING", "LISTENING"].includes(s.type)
    ) || "Nothing";
  switch (member.user.presence.activities) {
    case "PLAYING":
  }
  let estado;
  switch (member.user.presence.status) {
    case "online":
      estado = "<:online:734891023657992394>";
      break;
    case "dnd":
      estado = "<:dnd:734891023729295421>";
      break;
    case "offline":
      estado = "<:off:734891023951724564>";
      break;
    case "idle":
      estado = "<:idle:734891023930491012> ";
      break;
  }

  let info = [
    "** User**",
    `**❯ Name:** ${member.user.username}`,
    `**❯ Tag:** ${member.user.discriminator}`,
    `**❯ ID:** ${member.id}`,
    `**❯ Flags:** ${
      userFlags.length
        ? userFlags.map((flag) => flags[flag]).join(", ")
        : "None"
    }`,
    `**❯ Avatar:** [Download](${member.user.displayAvatarURL({
      dynamic: true,
    })})`,
    `**❯ Created at:** ${moment(member.user.createdTimestamp).format(
      "LT"
    )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
      member.user.createdTimestamp
    ).fromNow()}`,
    `**❯ State:** ${estado}`,
    `**❯ State custom:** ${
      !member.user.presence.activities[0]
        ? "Nothing"
        : member.user.presence.activities[0].type == "CUSTOM_STATUS"
        ? member.user.presence.activities[0].state
        : "Nothing"
    }`,
    `**❯ Activity:** ${activity}`,
    "",
    "** Member**",
    `**❯ Higher role:** ${
      member.roles.highest.id === message.guild.id
        ? "None"
        : member.roles.highest
    }`,
    `**❯ Entry:** ${moment(member.joinedAt).format("LL LTS")}`,
    `**❯ Higher hoist role:** ${
      member.roles.hoist ? member.roles.hoist : "None"
    }`,
    `**❯ Roles:** ${member.roles.cache
      .map((role) => role.toString())
      .join(",")}`,
  ];

  const emebed = new MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))

    .setColor("RANDOM")
    .setDescription(info);
  message.channel.send(emebed);
}
};
