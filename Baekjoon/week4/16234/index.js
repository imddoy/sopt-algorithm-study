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
    const [N, L, R] = input[0].split(" ").map(Number);
    const land = input.slice(1).map((line) => line.split(" ").map(Number));

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]; // x축, y축 기준 (하, 우, 상, 좌)

    let days = 0;

    // 유효한지 확인
    const isValid = (x, y) => x >= 0 && y >= 0 && x < N && y < N;

    const bfs = (startX, startY, visited) => {
      const queue = [[startX, startY]];
      const union = [[startX, startY]];
      let sum = land[startX][startY];
      visited[startX][startY] = true;

      // 연합 찾기
      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (
            isValid(nx, ny) &&
            !visited[nx][ny] &&
            Math.abs(land[x][y] - land[nx][ny]) >= L &&
            Math.abs(land[x][y] - land[nx][ny]) <= R
          ) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
            union.push([nx, ny]);
            sum += land[nx][ny];
          }
        }
      }

      // 인구 계산
      const newP = Math.floor(sum / union.length);
      for (const [x, y] of union) {
        land[x][y] = newP;
      }

      return union.length > 1;
    };

    // 매일 반복
    while (true) {
      const visited = Array.from({ length: N }, () => Array(N).fill(false));
      let hasUnion = false;

      // 모든 나라 반복
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          if (!visited[x][y]) {
            if (bfs(x, y, visited)) {
              hasUnion = true;
            }
          }
        }
      }

      if (!hasUnion) break;
      days++;
    }

    console.log(days);
  });
