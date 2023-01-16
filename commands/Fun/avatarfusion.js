const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');

module.exports = {
        name: 'avatarfusion',
        aliases: ['avatarfuse', 'fuseavatar'],
        category: 'fun',
        usage: '[first mention | first username | first ID | first nickname] <second mention | second username | second ID | second nickname>',
        description: 'Desenha o avatar de um usuário sobre o avatar de outro usuário',
    run: async (bot, message, args) => {
        if (!message.guild.me.hasPermission('ATTACH_FILES')) return message.channel.send("**Missing Permissions - [ATTACH_FILES]!**");
        if (!args[0]) return message.channel.send("**Qual usuário você gostaria de ser a base?**");
        if (!args[1]) return message.channel.send("**Qual usuário você gostaria de colocar sobre a base?**");
        let base = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName === args[0].toLocaleLowerCase());
        if (!base) return message.channel.send("**Usuário de base não encontrado!**");
        let overlay = message.mentions.members.first(2)[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName === args[1].toLocaleLowerCase());
        if (!overlay) return message.channel.send("**Usuário de sobreposição não encontrado!**");
        const baseAvatarURL = base.user.displayAvatarURL({ format: 'png', size: 512 });
        const overlayAvatarURL = overlay.user.displayAvatarURL({ format: 'png', size: 512 });
        try {
            const baseAvatarData = await request.get(baseAvatarURL);
            const baseAvatar = await loadImage(baseAvatarData.body);
            const overlayAvatarData = await request.get(overlayAvatarURL);
            const overlayAvatar = await loadImage(overlayAvatarData.body);
            const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
            const ctx = canvas.getContext('2d');
            ctx.globalAlpha = 0.5;
            ctx.drawImage(baseAvatar, 0, 0);
            ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
            return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'avatarfusion.png' }] });
        } catch (err) {
            return message.channel.send(`Oh não, ocorreu um erro: \`${err.message}\`. Tente mais tarde!`);
        };
    }
};