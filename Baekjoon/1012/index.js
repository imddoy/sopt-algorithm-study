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
    const T = Number(input[0]); // 테스트 케이스 수
    let inputRow = 1; // 입력 줄

    let results = [];

    // 테스트 케이스마다 반복
    for (let i = 0; i < T; i++) {
      const [M, N, K] = input[inputRow++].split(" ").map(Number);
      const field = Array.from({ length: N }, () => Array(M).fill(0)); // 가로 M, 세로 N

      // 배추 위치
      for (let k = 0; k < K; k++) {
        const [x, y] = input[inputRow++].split(" ").map(Number);
        field[y][x] = 1; // 배추 표시
      }

      let wormCount = 0; // 지렁이

      const findCabbage = (x, y) => {
        const directions = [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]; // x축, y축 기준 (하, 우, 상, 좌)

        field[y][x] = 0; // 다시 탐색 못하도록 0처리
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          // 배추밭 안에 있고, 배추가 있다면
          if (nx >= 0 && ny >= 0 && nx < M && ny < N && field[ny][nx] === 1) {
            findCabbage(nx, ny); // 인접한 배추 찾기
          }
        }
      };

      // 배추밭 탐색
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          // 확인할 배추가 있다면
          if (field[y][x] === 1) {
            wormCount++; // 지렁이 수 증가
            findCabbage(x, y); // 인접한 배추 찾기
          }
        }
      }

      results.push(wormCount);
    }

    console.log(results.join("\n")); // 각 테스트 케이스별 결과 출력

    process.exit();
  });
