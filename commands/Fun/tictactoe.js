const { tictactoe } = require('reconlx')

module.exports = {
  name: 'tictactoe',
  aliases: ["jdv", "ttt"],
  group: 'fun',
  description: 'jogue o jogo da velha',
  examples: [
    'tictactoe <member>'
  ],
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Especifique um membro')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}