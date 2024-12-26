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
    const patterns = ["pi", "ka", "chu"];
    let s = input[0];

    while (s.length > 0) {
      let matched = false;
      for (const pattern of patterns) {
        if (s.startsWith(pattern)) {
          // 문자열이 pi나 ka나 chu로 시작한다면
          s = s.slice(pattern.length); // 뒷 문자열 남기기
          matched = true; // 매칭 성공
          break;
        }
      }

      if (!matched) {
        // 매칭되지 않는 경우
        console.log("NO");
        readline.close();
        return;
      }
    }

    console.log("YES");
    readline.close();
  });
