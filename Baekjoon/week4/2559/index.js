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
    const [N, K] = input[0].split(" ").map(Number);
    const arrayT = input[1].split(" ").map(Number);

    let sum = 0;

    // 초기값
    for (let i = 0; i < K; i++) {
      sum += arrayT[i];
    }

    let max = sum;

    // 추가 값은 더하고, 맨앞 값은 빼주기 반복
    for (let i = K; i < N; i++) {
      sum = sum - arrayT[i - K] + arrayT[i];
      max = max > sum ? max : sum;
    }

    console.log(max);

    process.exit();
  });
