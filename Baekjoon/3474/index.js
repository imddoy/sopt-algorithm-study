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
    const T = parseInt(input[0]);
    const result = [];

    for (let i = 1; i < T + 1; i++) {
      const N = parseInt(input[i]);
      let count = 0;
      for (let j = 1; ; j++) {
        if (Math.pow(5, j) > N) break;
        count += Math.floor(N / Math.pow(5, j));
      }
      result.push(count);
    }

    console.log(result.join("\n"));
    process.exit();
  });
