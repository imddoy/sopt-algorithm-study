const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input = line.trim().split("");
  })
  .on("close", function () {
    // 답안
    const alphabet = "abcdefghijklmnopqrstuvwxyz"; // index 비교할 알파벳

    const result = new Array(alphabet.length).fill(0);

    // 입력한 알파벳이 있는 index를 찾아 1씩 증가
    input.forEach((i) => result[alphabet.indexOf(i.toLowerCase())]++);

    console.log(result.join(" ")); // 결과 출력

    process.exit();
  });
