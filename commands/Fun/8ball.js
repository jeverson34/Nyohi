module.exports = {
  name: "8ball",
  aliases: ["🎱",
      "8b",
      "8-ball",
      "eightball"
    ],
  category: "Fun",
  description: "Responder uma pergunta",
  usage: "8ball <pergunta>",
    run: async (client, message) => {

let respostas = [
  'Talvez.',
  'Certamente não.',
  ' Acredito que sim.',
  'Não em seus sonhos mais selvagens.',
  'Há uma boa chance.',
  'Muito provável.',
  'Acho que sim.',
  'Espero que não.',
  'Acredito que sim.',
  'Nunca!',
  'Fuhgeddaboudit.',
  'Ahaha! Verdade?!?',
  'Pfft.',
  'Desculpe, bucko.',
  'Claro que sim.',
  'Inferno para o não.',
  'O futuro é sombrio.',
  'O futuro é incerto.',
  'Eu prefiro não falar.',
  'Quem se importa?',
  'Possivelmente.',
  'Nunca, nunca, nunca.',
  'Há uma pequena chance.',
  'Sim!'
]

const BallNum = Math.floor(Math.random() * respostas.length); 
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec)); 

msg = await message.channel.send('Pergunta difícil, vamos ver ...');
await delay(3000); 
msg.edit(respostas[BallNum]);

}
};