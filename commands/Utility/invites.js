const Discord = require("discord.js");
const arraySort = require("array-sort");
const t = require("table");
const { Color } = require("../../config.json");

module.exports = {
  name: "invites",
  aliases: ["invinfo"],
  category: "Utility",
  description: "mostar rank de invites",
  usage: "invites",
  run: async (client, message, args) => {
    try {
        const embed = new Discord.MessageEmbed().setColor(Color)
        if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
            embed.setAuthor("❌ Error").setDescription("Não tenho acesso aos convites do servidor, verifique minhas permissões!");
            return message.channel.send({
                embed
            });
        }
        let invites = await message.guild.fetchInvites();
        if (invites.size === 0) {
            embed.setAuthor("❌ Error").setDescription("Atualmente não existem convites criados no servidor!");
            return message.channel.send({
                embed
            });
        }
        invites = invites.array();
        arraySort(invites, "uses", {
            reverse: true
        });
        const usedInvites = [
            ["Usuário", "Usos"]
        ];
        invites.forEach(invite => usedInvites.push([invite.inviter.tag, invite.uses]));
        embed.setTitle(`📜 Rank de Convites`).setDescription(usedInvites).setColor(Color);
        return message.channel.send({
            embed
        });
    } catch (err) {
        console.log(err.stack);
        return this.client.embed("", message);
    }

}
};
