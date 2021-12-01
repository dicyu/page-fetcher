const fs = require('fs');
const request = require('request');
const readline = require('readline');
const userInput = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// constants for URL and PATH for download
const url = userInput[0];
const path = userInput[1];

// checking if this was working
// console.log(url);
// console.log(path);

request(url, (error, response, body) => {
  if (error) {
    console.log("URL does not exist, exiting program."); // => If input is not vaild URL, this error is posted
    process.exit();
  } else if (fs.existsSync(path)) { // => checking to see if the file already exists w/ path
    rl.question(`The ${path} already exists, do you want to override it? Press y to override `, (answer) => {
      if (answer.toLowerCase() === 'y') { // => added a toLowerCase
        fs.writeFile(path, body, err => { // => if input was y, then begin writing the file
          if (err) {
            console.log("Error has occured. Exiting program.");
            process.exit();
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${path}. Program will now exit.`);
            process.exit();
          }
        });
      } else {
        // if input was something else but y, program will exit
        console.log("I guess you hit the wrong button. Exiting program.");
        process.exit();
      }
    });
  } else {
    // if the file currently does not exist then write file
    fs.writeFile(path, body, err => {
      if (err) {
        console.log("Error has occured. File path is invalid. Exiting program.");
        process.exit();
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}. Program will now exit.`);
        process.exit();
      }
    });
  }
});
