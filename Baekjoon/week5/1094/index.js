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
    const X = parseInt(input);
    const count = X.toString(2) // 2진수로 바꾸기
      .split("") // 비트 분리
      .filter((bit) => bit === "1").length; // 1 찾기
    console.log(count); // 1의 개수 출력
  });
