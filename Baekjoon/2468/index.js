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
    const N = Number(input[0]); // 지역
    const region = input.slice(1).map((line) => line.split(" ").map(Number)); // 지역 높이 저장
    const max = Math.max(...region.flat()); // 가장 높은 지역

    let results = 0;

    // 안전구역이 발생하는 비의 범위만큼 반복
    for (let rain = 0; rain < max; rain++) {
      let safety = 0;
      // 탐색 여부
      const visitable = region.map((row) =>
        row.map((height) => (height > rain ? 1 : 0))
      );
      const findSafety = (x, y) => {
        const directions = [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]; // x축, y축 기준 (하, 우, 상, 좌)

        visitable[y][x] = 0; // 다시 탐색 못하도록 0처리
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          // 지역 안에 있고, 안전구역이 있다면
          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < N &&
            ny < N &&
            visitable[ny][nx] === 1
          ) {
            findSafety(nx, ny); // 인접한 안전구역 찾기
          }
        }
      };

      // 지역 탐색
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          // 확인할 안전구역이 있다면
          if (visitable[y][x] === 1) {
            safety++; // 안전구역 수 증가
            findSafety(x, y); // 인접한 안전구역 찾기
          }
        }
      }

      results = Math.max(results, safety);
    }

    console.log(results);

    process.exit();
  });
