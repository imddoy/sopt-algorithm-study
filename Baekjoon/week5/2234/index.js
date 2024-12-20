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
    const castle = input.slice(1).map((row) => row.split(" ").map(Number));

    const directions = [
      [0, -1, 1], // 서쪽
      [-1, 0, 2], // 북쪽
      [0, 1, 4], // 동쪽
      [1, 0, 8], // 남쪽
    ];

    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    const isValid = (x, y) => x >= 0 && y >= 0 && x < M && y < N;

    const bfs = (startX, startY) => {
      const queue = [[startX, startY]];
      visited[startX][startY] = true;
      let size = 0;

      while (queue.length) {
        const [x, y] = queue.shift();
        size++;

        for (const [dx, dy, wall] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (
            isValid(nx, ny) &&
            !visited[nx][ny] &&
            (castle[x][y] & wall) === 0 // 벽이 없는지
          ) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
          }
        }
      }
      return size;
    };

    let roomCount = 0;
    let maxRoomSize = 0;
    const roomSizes = [];

    // 방 탐색
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          const roomSize = bfs(i, j);
          roomCount++;
          maxRoomSize = Math.max(maxRoomSize, roomSize);
          roomSizes.push(roomSize);
        }
      }
    }

    // 벽 제거 후 최대 방 크기 계산
    let maxCombinedRoomSize = 0;
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        for (const [dx, dy, wall] of directions) {
          const nx = i + dx;
          const ny = j + dy;

          if (isValid(nx, ny) && (castle[i][j] & wall) !== 0) {
            // 벽 제거 시 방 크기 계산
            visited.forEach((row) => row.fill(false)); // visited 초기화
            castle[i][j] -= wall; // 벽 제거
            castle[nx][ny] -=
              wall === 1 ? 4 : wall === 2 ? 8 : wall === 4 ? 1 : 2; // 맞은편 벽 제거
            const combinedRoomSize = bfs(i, j);
            maxCombinedRoomSize = Math.max(
              maxCombinedRoomSize,
              combinedRoomSize
            );
            castle[i][j] += wall; // 벽 복구
            castle[nx][ny] +=
              wall === 1 ? 4 : wall === 2 ? 8 : wall === 4 ? 1 : 2; // 맞은편 벽 복구
          }
        }
      }
    }

    console.log(roomCount);
    console.log(maxRoomSize);
    console.log(maxCombinedRoomSize);
  });
