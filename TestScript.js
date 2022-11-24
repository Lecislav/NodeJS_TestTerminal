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

//keylogger
const keylogger = require("keylogger.js");

//Cursor
const NodeCursor = require("node-cursor");

//express
const express = require("express");
const bodyParser = require("body-parser");
const { type } = require("node:os");


//>>>>variables>>>
let rl; //readline Interface
let cursorPosition;

let child; //subprocess

let fileName;

let server;
let connectioAmount = 0;
let requestAmount = 0;
let responseAmount = 0;

const person = {
  name: "Mateusz",
  age: 28,
};

const hobbies=['sport','music'];

let app;
//<<<variables<<<


//>>>CORE>>>
//createHttpServer();
//httpGetRequest();
//httpPostRequest();
//createFile('lol1.txt');
//editFile('lol','lol');
// readingFromConsole();
// runSubprocess();
// beforeExit();
 //repeatedFunction();
// destructuringFunction(person);
// destructuringFunctionArray();
//asynchronicFunction();
//showInputAtguments();
//keyPressEvent();
//keyloggerUse();
//expressServer();
//shoInputArgumentsInFuntion(1,2,'dsad','lol');
//destructuringObjectNewName();
//destructuringObjectMutatingVariables(person);
//console.log(copyObject(person));
//mouseCursorPositionRepeated();
//restPatternSimpleExampleArray();
//restPatternSimpleExampleObject();
//loopingArrays();
//loopingObjects();
//sets();
maps();

//<<<CORE<<<

//***Functions, all activity of current process***
function httpPostRequest() {
  let options = {
    host: "localhost",
    port: 8090,
    method: "POST",
  };

  let req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(`respond from server: ${data}`);
    });
  });
  //writing data to server
  req.write("hellooo");
  req.end();
}
function httpGetRequest() {
  let options = {
    host: "localhost",
    port: 8090,
    method: "GET",
  };

  http
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(data);
      });
    })
    .end();
}
function createHttpServer() {
  //create new server listining oin 8090
  server = http.createServer((req, res) => {
    //server log request
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      console.log(`request to server: ${data}`);
      //server respond
    });
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
    console.log(`connection:${connectioAmount}`);
  });
  //event on request
  server.on("request", (request, response) => {
    const { method } = request;
    requestAmount++;
    responseAmount++;
    console.log(method);
    console.log(`request:${requestAmount}`);
    console.log(`response:${responseAmount}`);
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
      // cursorPosition = rl.getCursorPos();
      // rl.prompt();
      // console.log(
      //   `Cursor position: ${cursorPosition.rows}, ${cursorPosition.cols}`
      // );
    }
    console.log('repeated function');
    console.log( NodeCursor.getCursorPosition());
  }, 1000); //repetition time = 5 sec
}
function copyArray(array) {
  return [...array]; //3 dot extraxt content of array or object
}
function createArray(...args) {
  // 3 dots  merge multiple arguments
  return args;
}
function destructuringFunction({ name, age }) {
  //extracting desired data from the object
  console.log(name);
  console.log(age);
}
function destructuringFunctionArray(){
  const [hobby1,hobby2]=hobbies;
  console.log(hobby1);
  console.log(hobby2);
}
function asynchronicFunction(){
  const promise= new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('asyn activity');
      console.log('assync');
    },1000)
  });
  return promise;
}
function showInputArguments(){
  console.log(process.argv.slice(2));
}
function keyPressEvent(){
  readline.emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY)
      process.stdin.setRawMode(true);
  
  process.stdin.on('keypress', (chunk, key) => {
    if (key && key.name == 'q')
    process.exit();
  });
}
function keyloggerUse(){
  keylogger.start((key, isKeyUp, keyCode) => {
    console.log("keyboard event", key, isKeyUp, keyCode);
  });
}
function shoInputArgumentsInFuntion(){
  for(let i=0;i<arguments.length;i++){
    console.log(arguments[i]);
  }
}
function expressServer(){
  app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/", (req, res, next) => {
    console.log("im in middleware");
    res.send("<h1>Hello</h1>");
    next();
  });
  app.listen(3001);
}
function mouseCursorPositionRepeated() {
  setInterval(() => {
    console.log("repeated function");
    console.log(NodeCursor.getCursorPosition());
  }, 1000); //repetition time = 5 sec
}
function copyObject(obj){//shallow copy
  if((typeof obj) === "object")return Object.assign({},obj);
}
function destructuringObjectNewName(){
  const {name: nname, age: agge}= person;
  console.log(nname,agge);
}
function destructuringObjectMutatingVariables(obj) {
  let name = "Dawid";
  let age = 35;
  ({ name, age } = obj);
  console.log(name, age);
}
function restPatternSimpleExampleArray(){
  const[a,b, ...others]=[1,2,3,4,5];
  console.log(a,b,others);
}
function restPatternSimpleExampleObject(){

  const names={
    name1:'lol1',
    name2:'lol2',
    name3:'lol3'
  }
  const {name2, ...others}=names;
  //console.log(name2,others);
  function lol ({name1,name3},...others){
    console.log(name1);
    console.log(name3);
    console.log(others);
  }
  lol(names,1,2,3,2323,2);

}
function loopingArrays(){
  const arr =[1,2,3,4,5];
  for(const item of arr){
    console.log(item);
  }
}
function optionalChaining(){

  const obj={
    name:'name',
    subobj:{
      name:'subobjname'
    }
  }
console.log(obj);
console.log(obj.subobj?.name);
console.log(obj.subobj?.subsubobj);
console.log(obj.subobj?.subsubobj?.subsbsbsbsbsobj);
console.log(obj.show?.(1,2));
obj.obj={
  name:'lol'
}
console.log(obj.obj);
}
function loopingObjects(){
  const obj = {
    name1: "lol1",
    name2: "lol2",
    name3: "lol3",
  };
  //KEYS
  for (const name of Object.keys(obj)) {
    console.log(name);
  }
  //VALUES
  for (const name of Object.values(obj)) {
    console.log(name);
  }
  //ENTRIES
  for (const name of Object.entries(obj)) {
    console.log(name);
  }
}
function sets(){
  const set = new Set([
    'lol1',
    'lol1',
    'lol2',
    'lol2',
    'lol3',
  ]);

console.log(set);

for( const x of set ){
  console.log(x);
}
console.log(set.has('lol3'));
set.delete('lol1');
console.log(set);
console.log(...set);

}
function maps(){
  const map = new Map();
map.set('name', true);
map.set(2,3213);
map.set('lol','lolollo');
map.set(true, 1);
map.set(true, 2);
for(const x of map){
  console.log(x);
}
console.log(map.get(true));

const newMap = new Map([
  ['1','LOL1'],
  ['2','lol2'],
  ['3','lol3']
]);

for(const x of newMap){
  console.log(x);
}
console.log(newMap.get('3'));

const personMap= new Map(Object.entries(person));
console.log(personMap);
console.log('unpacking');
console.log(...map);
}