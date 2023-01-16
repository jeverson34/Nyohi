module.exports = {
  name: 'rate',
  aliases: ["rate"],
  group: 'fun',
  description: 'Rates the provided argument',
  parameters: [ 'something to rate with' ],
  examples: [
    'rate Potato',
    'rate cheese',
    'rate Bringles'
  ],
  run: (client, message, args) => {

    if (!args.length){
      return message.channel.send(`<:cancel:809446722362802246> | ${message.author}! Dê-me algo para avaliar !!`);
    };

    const raw = args.join(' ').replace(/[^\w\s]/gi,1202)
    let rate = parseInt(raw, 36) % 101;
    const emoji = (rate) => [
        '\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤'
      , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️'
    ][Math.floor(rate / 10)];

    if ([
      'andreza linda', "andreza", "nyohi", "jeverson"
    ].includes(raw.toLowerCase())){
      rate = 100;
    };

    return message.channel.send(`${emoji(rate)} (**${rate}**) %`)
  }
};
