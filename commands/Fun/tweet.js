const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
        name: "tweet",
        aliases: [''],
        category: "image",
        description : "Sends A Tweet",
        usage: "[username] <text>",
    run: async(bot, message, args) => {

        let user = args[0];
        let text = args.slice(1).join(" ");

        let m = await message.channel.send("**Por favor, espere...**");

        if(!user){
            return m.edit("**Você tem que inserir o apelido de alguém no Twitter!**");
        }

        if(!text){
            return m.edit("**Você deve inserir uma mensagem!**");
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
            await message.channel.send(`**Novo tweet publicado por ${user}**`, attachment);
            m.delete({ timeout: 5000});
        } catch(e){
            m.edit("Erro, tente novamente! Mencione alguém");
        }
    }
};