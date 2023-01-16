const discord = require('discord.js');
const { Color, Prefix } = require("../../config.js");
const num_conv = require('number-to-words');

module.exports = {
        name: 'bigtext',
        aliases: ['textogande'],
        category: 'utility',
        usage: 'bigtext <texto>',
        description: 'deixar o seu texto grande',
    run: async (bot, message, args) => {
    let output = args.join(' ');
    if (!output)
        return message.channel.send(new discord.MessageEmbed()
            .setTitle('Uso incorreto do comando.')
            .setDescription("``" + `${Prefix}bigtext (Texto) ` + "``")
            .setColor(Color));

    let bigtext_arr = new Array();
    for (let i = 0; i < output.length; i++) {
        let isnumber = await parseInt(output[i]);
        if (isnumber >= 0 && isnumber <= 9)
            bigtext_arr.push(`:${num_conv.toWords(output[i])}:`)
        else {
            if (output[i] !== ' ') {
                if (!output[i].match(/^[a-zA-Z]+$/)) // Regex for alphabetical entries
                    bigtext_arr.push(`:question:`)
                else
                    bigtext_arr.push(`:regional_indicator_${output[i].toLowerCase()}:`)
            } else bigtext_arr.push('   ');
        }
    }

    try {
        await message.channel.send(bigtext_arr.join(''));
        return message.delete()
    } catch (e) {
        return message.channel.send(new discord.MessageEmbed()
            .setTitle('Ocorreu um erro ao enviar a mensagem.')
            .setColor(Color));
    }


}
};