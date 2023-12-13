/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    const markovMac = new markov.MarkovMachine(text);
    console.log(markovMac.makeText());
}



/** read file and generate text from it. */

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
  
  }
  
  
/** read URL and make text from it. */
  
  
async function makeURLText(url) {
    let resp;
  
    try {
      resp = await axios.get(url);
    } catch (err) {
      console.error(`Error reading URL: ${url}: ${err}`);
      process.exit(1);
    }
    generateText(resp.data)
}
  
  
/** interpret cmdline to decide what to do. */
  
let [method, path] = process.argv.slice(2);
  
if (method === "file") {
makeText(path);
}

else if (method === "url") {
makeURLText(path);
}

else {
console.error(`Invalid: ${method}`);
process.exit(1);
}