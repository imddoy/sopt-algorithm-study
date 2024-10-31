const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line.trim());
  })
  .on("close", function () {
    const [A, B, C] = input[0].split(" ").map(BigInt);

    const getRest = (a, b, c) => {
      if (b === BigInt(1)) return a % c;

      if (b % BigInt(2) === BigInt(0)) {
        // b가 짝수인 경우
        const half = getRest(a, b / BigInt(2), c);
        return (half * half) % c;
      } else {
        // b가 홀수인 경우
        const half = getRest(a, (b - BigInt(1)) / BigInt(2), c);
        return (half * half * a) % c;
      }
    };

    const result = getRest(A, B, C).toString();
    console.log(result);

    process.exit(); // 결과 출력
  });