const { Random } = require("something-random-on-discord")
const random = new Random();
 
module.exports = {
  name: "neko",
  usage: "",
  aliases: '',
  description: "...",
  category: "Nsfw",
  
  description: "Get Fresh Neko Images :D",
run: async (client, message, args) => {
  
    let data = await random.getNeko()
    message.channel.send(data)
  
}
}