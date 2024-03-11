function sum() {
  let counter = 0;
  for (let i = 0; i < 5e9; i++) {
    counter++;
  }
  return counter;
}

process.on("message", () => {
  const counter = sum();
  console.log("Child process id: " + process.pid);
  process.send(counter);
});
