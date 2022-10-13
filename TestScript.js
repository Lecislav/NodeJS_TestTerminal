//object managing currently script's process
const process = require("node:process");

// object operating on readalbe streams
const readline = require("node:readline");

//object to run  subprocesses
const childprocess = require("node:child_process");

//variables
let rl; //readline Interface
let child; //subprocess
let cursorPosition;
//variables

//CORE
readingFromConsole();
runSubprocess();
beforeExit();
repeatedFunction();
//CORE

//Functions, all activity of current process
function readingFromConsole() {
  //Interfaces (in/out stream etc.)
  rl = readline.createInterface({
    //classic input,output streams
    input: process.stdin,
    output: process.stdout,
    //create a prompt
    prompt: "#",
  });

  //show prompt
  rl.prompt();

  // add event listner for typing to console new line
  rl.on("line", (line) => {
    rl.prompt();
    switch (
      line.trim() //trim remove white space in string
    ) {
      case "close":
        console.log("closing input stream");
        rl.prompt();
        setTimeout(() => {
          //2sec delay before closing
          console.clear();
          rl.close();
        }, 2000);
        break;
      default:
        console.log(`You Typed to console: '${line.trim()}'`);
        rl.prompt();
        break;
    }
  });

  // add event listner for closing streams and also process
  rl.on("close", () => {
    console.log("CLOSED");
    process.exit(0);
  });
}
function runSubprocess() {
  //run test subprocess
  child = childprocess.fork(__dirname + "/child.js");
}
function beforeExit() {
  //task to execution before exit of process
  process.on("exit", (code) => {
    console.log("Process exit event with code: ", code);
  });
}
function repeatedFunction() {
  //repeted function on seted interval
  setInterval(() => {
   // rl.prompt();
   //  console.log("I'm showing every 5 sec!");
    if (rl) {
      //show cursor positions
      cursorPosition=rl.getCursorPos();
      rl.prompt();
      console.log(`Cursor position: ${cursorPosition.rows}, ${cursorPosition.cols}`);
    }
  }, 5000);//repetition time = 5 sec

}
