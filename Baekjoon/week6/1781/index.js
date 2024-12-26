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
    const problems = input.slice(1).map((line) => line.split(" ").map(Number));

    // 데드라인 오름차순, 컵라면 내림차순
    problems.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    const selected = []; // 데드라인별 문제 관리
    let totalRamen = 0;

    for (const [deadline, ramen] of problems) {
      // 현재 문제 추가
      selected.push(ramen);
      totalRamen += ramen;

      // 데드라인 초과 시 가장 적은 라면 제거
      if (selected.length > deadline) {
        let minRamen = Infinity;
        let minIndex = -1;
        for (let i = 0; i < selected.length; i++) {
          if (selected[i] < minRamen) {
            minRamen = selected[i];
            minIndex = i;
          }
        }
        // 최소값 제거
        totalRamen -= minRamen;
        selected.splice(minIndex, 1);
      }
    }

    console.log(totalRamen);
  });
