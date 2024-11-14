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
    const [M, N] = input[0].split(" ").map(Number);
    const board = input.slice(1).map((line) => line.split(" ").map(Number));
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]; // x축, y축 기준 (하, 우, 상, 좌)
    let time = 0;
    let cheeseCount = 0;

    // 정사각형 안에 있는지
    const isValid = (x, y) => x >= 0 && y >= 0 && x < M && y < N;

    const meltCheese = () => {
      const visited = Array.from({ length: M }, () => Array(N).fill(false)); // 탐색 기록 저장
      const queue = [[0, 0]];
      visited[0][0] = true;
      let melted = [];

      while (queue.length) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (!isValid(nx, ny) || visited[nx][ny]) continue;

          visited[nx][ny] = true; // 방문 영역 표시

          if (board[nx][ny] === 1) {
            melted.push([nx, ny]); // 치즈라면 녹일 치즈 저장
          } else if (board[nx][ny] === 0) {
            queue.push([nx, ny]); // 치즈가 아니라면 외부 공기
          }
        }
      }

      for (const [x, y] of melted) {
        board[x][y] = 0; // 치즈 녹이기
      }

      return melted.length;
    };

    while (true) {
      const cheese = meltCheese(); // 한 시간 동안 녹은 치즈의 개수
      if (cheese === 0) break; // 더 이상 녹을 치즈가 없으면 루프 탈출
      cheeseCount = cheese; // 마지막으로 녹은 치즈 개수 저장
      time++; // 시간 증가
    }

    console.log(time);
    console.log(cheeseCount);

    process.exit();
  });
