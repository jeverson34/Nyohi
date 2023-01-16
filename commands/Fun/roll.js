const text = require('../../util/string');

module.exports = {
  name: 'roll',
  aliases: ["roll"],
  group: 'fun',
  description: 'Gere um número aleatório de 1- [número selecionado]',
  examples: [
    'roll 10',
    'roll 100',
    'roll 1234567'
  ],
  run: (client, message, [tail]) => {

    const rand = Math.random();
    tail = Math.round(tail) || Math.round(Math.random() * 999) + 1;

    return message.channel.send(`**${text.commatize(Math.round(rand * tail))}** ---> [0 -> ${text.commatize(tail)}]`)
  }
};
