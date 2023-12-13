/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for( let i = 0; i < this.words.length; i++) {
      let firstWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(firstWord)) { 
        chains.get(firstWord).push(nextWord);
      } else {
        chains.set(firstWord, [nextWord]);
      }
    }

    this.chains = chains;

  }




  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let words = Array.from(this.chains.keys());
    let word = MarkovMachine.choice(words);
    let output = [];

    while(output.length < numWords && word !== null) {
      output.push(word);
      word = MarkovMachine.choice(this.chains.get(word));
    }

    const res = output.join(" ");
    return res;
  }
}

module.exports = {
  MarkovMachine,
}
