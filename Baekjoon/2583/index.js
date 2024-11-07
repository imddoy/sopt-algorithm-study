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
    const [M, N, K] = input[0].split(" ").map(Number);
    const paper = Array.from({ length: M }, () => Array(N).fill(0));
    const results = [];

    // 직사각형 영역 채우기
    for (let i = 1; i <= K; i++) {
      const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
      for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
          paper[y][x] = 1; // 직사각형 영역 표시
        }
      }
    }

    const findNull = (x, y) => {
      let area = 1;
      const stack = [[x, y]]; // 스택에 좌표 저장

      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]; // x축, y축 기준 (하, 우, 상, 좌)

      while (stack.length) {
        // 스택에 저장된 좌표가 없을 때까지 반복
        const [cx, cy] = stack.pop();
        for (const [dx, dy] of directions) {
          const nx = cx + dx;
          const ny = cy + dy;
          // 종이 안에 있고, 빈 구역이 있다면
          if (nx >= 0 && ny >= 0 && nx < N && ny < M && paper[ny][nx] === 0) {
            paper[ny][nx] = 1; // 다시 탐색하지 않도록 1처리
            stack.push([nx, ny]); // 발견한 빈 구역을 탐색할 수 있도록 스택에 저장
            area++; // 넓이 계산
          }
        }
      }
      return area;
    };

    for (let y = 0; y < M; y++) {
      for (let x = 0; x < N; x++) {
        if (paper[y][x] === 0) {
          paper[y][x] = 1; // 다시 탐색하지 않도록 1처리
          results.push(findNull(x, y));
        }
      }
    }

    results.sort((a, b) => a - b);
    console.log(results.length);
    console.log(results.join(" "));

    process.exit();
  });
