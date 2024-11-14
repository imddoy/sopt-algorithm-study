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
    const N = parseInt(input[0]);
    let count = 0; // 현재까지 찾은 종말의 수의 개수
    const DEAD_NUM = "666";
    let number = 666;

    while (true) {
      if (String(number).includes(DEAD_NUM)) {
        count++;
      }

      if (count === N) {
        console.log(number);
        break;
      }

      number++;
    }

    process.exit();
  });
