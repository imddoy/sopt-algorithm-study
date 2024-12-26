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
    const N = parseInt(input[0]);
    const cows = input.slice(1).map((line) => line.split(" ").map(Number));

    // 도착시간 오름차순
    cows.sort((a, b) => a[0] - b[0]);

    let tta = 0; // 소요 시간

    for (const [arrival, check] of cows) {
      if (tta < arrival) {
        // 소요 시간이 소의 도착 시간보다 작으면 도착 시간에 맞춰 대기 => 값 업데이트
        tta = arrival;
      }
      // 검문 시간 추가
      tta += check;
    }

    console.log(tta);
  });
