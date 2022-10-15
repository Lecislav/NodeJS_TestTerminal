//object managing currently script's process
const process = require("node:process");

// object operating on readalbe streams
const readline = require("node:readline");

//object to run  subprocesses
const childprocess = require("node:child_process");

//object to interact with file system
const fs = require("node:fs");

//Http in nodejs
const http = require("node:http");

//variables
let rl; //readline Interface
let cursorPosition;

let child; //subprocess

let fileName;

let server;
let connectioAmount=0;
let requestAmount=0;
let responseAmount=0;
//variables

//CORE

createHttpServer();
httpGetRequest();
httpPostRequest();
//createFile('lol1.txt');
//editFile('lol','lol');
// readingFromConsole();
// runSubprocess();
// beforeExit();
// repeatedFunction();
//CORE

//Functions, all activity of current process

function httpPostRequest(){
  let options = {
    host: 'localhost',
    port: 8090,
    method: 'POST'
  };

let req = http.request(options, (res)=>{
  let data='';

  res.on('data', (chunk)=> {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
  });
req.write("hellooo");
req.end();
}
function httpGetRequest(){
  let options = {
    host: 'localhost',
    port: 8090,
    method: 'GET'
  };

http.request(options, (res)=>{
  let data='';

  res.on('data', (chunk)=> {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
  }).end();

}
function createHttpServer() {
  //create new server listining oin 8090
  server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  });
  //event on connection
  server.on("connection", (socket) => {
    connectioAmount++;
    console.log(`connection:${connectioAmount}`)
  });
  //event on request
  server.on("request", (request,response) => {
    const { method, url } = request;
    requestAmount ++;
    responseAmount++;
    console.log(method);
    console.log(url);
    console.log(`request:${requestAmount}`)
    console.log(`response:${responseAmount}`)
  });
  server.listen(8090);
}
function editFile(fileName, content) {
  if (typeof fileName === "string" && typeof content == "string") {
    fs.writeFile(fileName, content, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  }
}
function createFile(fileName) {
  fs.open(fileName, "w", function (err, file) {
    if (err) throw err;
    console.log("File created!");
  });
}
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
      cursorPosition = rl.getCursorPos();
      rl.prompt();
      console.log(
        `Cursor position: ${cursorPosition.rows}, ${cursorPosition.cols}`
      );
    }
  }, 5000); //repetition time = 5 sec
}
