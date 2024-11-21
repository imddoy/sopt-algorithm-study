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
    let inputRow = 1;

    const results = [];

    for (let t = 0; t < T; t++) {
      const n = parseInt(input[inputRow]);
      inputRow++;

      const clothes = {};
      for (let i = 0; i < n; i++) {
        const [, type] = input[inputRow].split(" ");
        inputRow++;

        // 정의되어있지 않으면 초기화
        if (!clothes[type]) {
          clothes[type] = 0;
        }

        clothes[type]++;
      }

      // 모든 종류의 경우의 수 계산
      let combinations = 1;
      for (const type in clothes) {
        combinations *= clothes[type] + 1;
      }

      results.push(combinations - 1);
    }

    console.log(results.join("\n"));

    process.exit();
  });
