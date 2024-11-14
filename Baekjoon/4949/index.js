const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
readline
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    const isBalanced = (str) => {
      const stack = [];
      const pairs = {
        "(": ")",
        "[": "]",
      };

      for (const char of str) {
        if (char === "(" || char === "[") {
          // 여는 괄호 스택에 추가
          stack.push(char);
        } else if (char === ")" || char === "]") {
          // 닫는 괄호인데 스택이 비었으면 불균형
          if (stack.length === 0) return false;
          // 짝 맞는지 확인
          const top = stack.pop();
          if (pairs[top] !== char) return false;
        }
      }

      // 스택이 비어있는 경우에만 균형 잡힘
      return stack.length === 0;
    };

    input.forEach((str) => {
      // 종료 조건
      if (str === ".") return;

      console.log(isBalanced(str) ? "yes" : "no");
    });

    process.exit();
  });
