//Child process only for test purpose
console.log("child process launched");
process.on("exit", (code) => {
  console.log("Child Process exit event with code: ", code);
});
