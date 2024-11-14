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
    const isBalanced = (str) => {
      const stack = [];
      const pairs = {
        "(": ")",
      };

      for (const char of str) {
        if (char === "(") {
          // 여는 괄호 스택에 추가
          stack.push(char);
        } else if (char === ")") {
          // 닫는 괄호인데 스택이 비었으면 불균형
          if (stack.length === 0) return false;
          stack.pop();
        }
      }

      // 스택이 비어있는 경우에만 균형 잡힘
      return stack.length === 0;
    };

    const T = parseInt(input[0]);
    for (let i = 1; i < T + 1; i++) {
      console.log(isBalanced(input[i]) ? "YES" : "NO");
    }

    process.exit();
  });
