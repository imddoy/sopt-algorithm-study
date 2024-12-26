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
    const lectures = input.slice(1).map((line) => line.split(" ").map(Number));
    if (lectures.length === 0) {
      console.log(0);
      return;
    }

    // 강연료 내림차순
    lectures.sort((a, b) => b[0] - a[0]);

    // 날짜별 강연 여부
    const maxDate = Math.max(...lectures.map((lecture) => lecture[1]));
    const schedule = Array(maxDate + 1).fill(false);

    let sum = 0;

    for (const [p, d] of lectures) {
      for (let day = d; day > 0; day--) {
        // 날짜 역순으로 탐색하기 => 선택의 폭이 넓어짐
        if (!schedule[day]) {
          schedule[day] = true;
          sum += p;
          break;
        }
      }
    }

    console.log(sum);
  });
