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
    const n = parseInt(input[0]);
    const s = input[1];

    const stack = []; // 스택
    let currentLength = 0; // 현재 올바른 괄호 문자열의 길이
    let maxLength = 0; // 가장 긴 올바른 괄호 문자열의 길이

    for (let i = 0; i < n; i++) {
      if (s[i] === "(") {
        // 여는 괄호라면
        stack.push(i);
      } else {
        // 닫는 괄호라면
        if (stack.length > 0) {
          // 매칭이 된다면
          stack.pop();
          currentLength += 2; // 현재 길이 +2
          maxLength = Math.max(maxLength, currentLength); // 최대 길이 갱신
        } else {
          // 매칭이 안된다면
          currentLength = 0; // 현재 길이 초기화
        }
      }
    }

    console.log(maxLength);
  });
