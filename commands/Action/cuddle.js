var Discord = require('discord.js');
var superagent = require('superagent');
const { Color } = require("../../config.js");

module.exports = {
  name: 'cuddle',
  aliases: ['carinho'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'dar um abraço carinhoso em alguem',
  examples: [ 'cookie' ],
  parameters: [],
  run: async ( client, message ) => {
	
    if (message.author.bot) return; // will not listen to bots
    let { body } = await superagent.get(`https://nekos.life/api/v2/img/cuddle`).catch(error => message.channel.send(`*bem, isso é um erro. tente novamente.\nAposto que funcionará da próxima vez*.\n \`${error}\``));

    mentionedUser = message.mentions.members.first()
    // console.log(mentionedUser)
let avatar = message.author.displayAvatarURL({format: 'png'});

    if (!mentionedUser) {
        let cuddleEmbed = new Discord.MessageEmbed()
            .setTitle(`sons de carinho :3`)
	    .setColor(Color)
            .setImage(body.url)
            .setTimestamp()
            .setAuthor(message.author.tag, avatar);
        message.channel.send(cuddleEmbed)
    }
    else {
        let cuddleEmbed = new Discord.MessageEmbed()
            .setTitle(`**${mentionedUser.nickname || mentionedUser.user.username}** e **${message.member.nickname || message.author.username}** estão abraçando :3`)
            .setColor(Color)
            .setImage(body.url)
            .setTimestamp()
            .setAuthor(message.author.tag, avatar);
        message.channel.send(cuddleEmbed)
    }
	
}
};
