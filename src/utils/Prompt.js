const readline = require('readline');

module.exports = class Prompt {
  constructor() {
    this.lineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
  }

  message(message) {
    return new Promise((resolve) => {
      this.lineInterface.question(message, (answer) => {
        resolve(answer);
      });
    });
  }

  startup(functionArray, customName = 'GuriLabs Matriz') {
    return new Promise((resolve) => {
      let question = '\x1b[1;34m'
        + '***************************\r\n'
        + `******* ${customName} *******\r\n`
        + '***************************\r\n\x1b[1;37m';
      for (let i = 0; i < functionArray.length; i++){
        question = question + `* [${i+1}] - ${functionArray[i]}\r\n`
      }
      question = question + '\x1b[1;34m***************************\r\n\x1b[0m'
        + '\x1b[1;37m'
        + 'Digite a função que deseja:\x1b[1;33m ';        
      this.lineInterface.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  question(question) {
    return new Promise((resolve) => {
      this.lineInterface.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
};
