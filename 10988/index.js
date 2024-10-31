const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input = line.trim();
  })
  .on("close", function () {
    // 답안
    let result = 1;

    for (let i = 0; i < Math.floor(input.length / 2); i++) {
      // 문자열의 절반까지 비교
      if (input[i] !== input[input.length - 1 - i]) {
        // 값이 다르면 0
        result = 0;
        break;
      }
    }

    console.log(result); // 결과 출력

    process.exit();
  });
