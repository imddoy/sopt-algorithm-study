const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
readline
  .on("line", (line) => {
    input.push(line.trim());
  })
  .on("close", () => {
    let results = [];

    for (const line of input) {
      const n = parseInt(line);
      let num = 1;
      let length = 1;

      // 나누어떨어질 때까지 반복
      while (num % n !== 0) {
        num = (num * 10 + 1) % n;
        length++;
      }

      results.push(length);
    }

    console.log(results.join("\n"));

    process.exit();
  });
