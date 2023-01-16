const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
        name: "clyde",
        aliases: [''],
        category: "fun",
        description: "Mostra mensagem enviada por Clyde Bot",
        usage: "<text>",
    run: async (bot, message, args) => {

        let text = args.join(" ");

        if (!text) {
            return message.channel.send("**Enter Text**");
        }

        let m = await message.channel.send("**Por favor, aguarde..**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch (e) {
            m.edit(e.message);
        }
    }
}