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
    const lab = input.slice(1).map((line) => line.split(" ").map(Number));
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]; // x축, y축 기준 (하, 우, 상, 좌)
    let maxSafeArea = 0;

    // 연구소 안에 있는지
    const isValid = (x, y) => x >= 0 && y >= 0 && x < N && y < M;

    // 바이러스 퍼짐
    const spreadVirus = (board) => {
      const queue = [];
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
          // 바이러스 탐색
          if (board[x][y] === 2) queue.push([x, y]);
        }
      }

      while (queue.length) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          if (isValid(nx, ny) && board[nx][ny] === 0) {
            board[nx][ny] = 2; // 바이러스 퍼짐
            queue.push([nx, ny]); // 이동
          }
        }
      }
    };

    // 안전 구역 크기 계산
    const calculateSafeArea = (board) => {
      return board.reduce(
        (sum, row) => sum + row.filter((cell) => cell === 0).length,
        0
      );
    };

    // 벽 3개 세우기
    const dfs = (count) => {
      if (count === 3) {
        const board = lab.map((row) => [...row]);
        spreadVirus(board);
        maxSafeArea = Math.max(maxSafeArea, calculateSafeArea(board)); // 최대 안전 구역 갱신
        return;
      }

      for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
          if (lab[x][y] === 0) {
            lab[x][y] = 1; // 벽 세우기
            dfs(count + 1);
            lab[x][y] = 0; // 벽 제거
          }
        }
      }
    };

    dfs(0); // 벽 세우기 시작
    console.log(maxSafeArea); // 최대 안전 구역 출력
    process.exit();
  });
