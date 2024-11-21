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
    const words = input.slice(1);

    let result = 0;

    // 단어 반복
    for (const word of words) {
      const stack = [];

      // 글자 반복
      for (const char of word) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      }

      if (stack.length === 0) {
        result++;
      }
    }

    console.log(result);

    process.exit();
  });
