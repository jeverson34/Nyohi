const discord = require("discord.js");
const { Color } = require("../../config.json");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports = {
  name: "qrcode",
  aliases: [""],
  category: "Utility",
  description: "crie um codigo qr",
  usage: 'qrcode <link>',
  run: async (client, message, args) => {
	const neb = args.join(' ');
	function isValidURL(string) {
		//regex for link
		// eslint-disable-next-line no-useless-escape
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}
	if (isValidURL(neb) == true) {
		const url = `http://api.qrserver.com/v1/create-qr-code/?data=${neb}&size=100x100`;

		const embed = new discord.MessageEmbed()
			.setColor(Color)
			.setTitle('QR CODE')
			.setImage(url);
		await message.channel.send(embed);
	}
	else return message.reply("Por favor insira um url válido no formato http(s)://www.example.com");
}
};