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
    const [N, M] = input[0].split(" ").map(Number);
    const map = input.slice(1).map((line) => line.split(""));

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]; // x축, y축 기준 (하, 우, 상, 좌)

    // 유효한 좌표인지 확인
    const isValid = (x, y) => x >= 0 && y >= 0 && x < N && y < M;

    const bfs = (startX, startY) => {
      const visited = Array.from({ length: N }, () => Array(M).fill(false));
      const queue = [[startX, startY, 0]]; // 거리를 0으로 초기화
      visited[startX][startY] = true;

      let maxDis = 0;

      while (queue.length) {
        const [x, y, distance] = queue.shift();
        maxDis = Math.max(maxDis, distance);

        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (isValid(nx, ny) && !visited[nx][ny] && map[nx][ny] === "L") {
            visited[nx][ny] = true;
            queue.push([nx, ny, distance + 1]); // 이동했으니 거리 1 증가
          }
        }
      }

      return maxDis;
    };

    let result = 0;
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (map[x][y] === "L") {
          result = Math.max(result, bfs(x, y));
        }
      }
    }

    console.log(result);

    process.exit();
  });
