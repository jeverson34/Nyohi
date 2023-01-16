const Discord = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
        name: "love",
        aliases: [''],
        category: "fun",
        description: "Mostra a imagem de 2 amantes, 3 pessoas!",
        usage: "[mention(1) | ID(1) | name(1) | nickname(1)] [mention(2) | ID(2) | name(2) | nickname(2)]",
    run: async (bot, message, args) => {
        
        let user =  await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(mp => mp.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let user2 =  await message.mentions.members.array()[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[1].toLocaleLowerCase()) || message.guild.members.cache.find(mp => mp.displayName.toLowerCase() === args[1].toLocaleLowerCase());
        if(!args[0]) return message.channel.send("**Digite o nome do amante!**")
        if(!args[1]) return message.channel.send("**Digite o nome de outro amante!**")
        
        if (!user) return message.channel.send("**Digite um usuário válido!**")
        if (!user2) return message.channel.send("**Digite um usuário válido!**")

        let m = await message.channel.send("**Por favor, aguarde..**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${user2.user.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch(e){
            m.edit("Erro, tente novamente! Mencione alguém");
        }
    }
};