const figlet = require('figlet');

module.exports = {
  name: "Ascii",
  aliases: [""],
  category: "Fun",
  description: "criar texti em ascii",
  usage: "Ascii <texto>",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('Forneça algum texto');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Algo deu errado');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Forneça um texto com menos de 2.000 caracteres')

            message.channel.send('```' + data + '```')
        })
    }
}