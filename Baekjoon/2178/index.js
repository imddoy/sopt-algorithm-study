const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line.trim()); // 각 줄을 input 배열에 저장
  })
  .on("close", function () {
    // 답안
    const [N, M] = input[0].split(" ").map(Number); // 첫 줄에서 N과 M 추출
    const maze = input.slice(1).map((row) => row.split("").map(Number)); // 미로를 2차원 배열로 변환

    console.log(findShortestPath(N, M, maze));

    process.exit();
  });

const findShortestPath = (N, M, maze) => {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]; // x축, y축 기준 (하, 우, 상, 좌)
  const queue = [[0, 0, 1]]; // 출발 좌표(0,0), 이동 거리(1)
  maze[0][0] = 0; // 이미 왔으니까 다시 오지 못하도록 0 처리

  while (queue.length > 0) {
    // 큐가 빌때까지 반복
    const [x, y, distance] = queue.shift(); // 현재 위치, 이동 거리

    for (const [dx, dy] of directions) {
      // 상 하 좌 우 확인하기
      const nx = x + dx;
      const ny = y + dy;

      // 미로를 벗어나지 않고 갈 수 있다면
      if (nx >= 0 && ny >= 0 && nx < N && ny < M && maze[nx][ny] === 1) {
        if (nx === N - 1 && ny === M - 1) return distance + 1; // 도착하면 최소 거리 반환
        queue.push([nx, ny, distance + 1]); // 도착하지 못했다면 이동 거리 증가 후 큐에 추가하기
        maze[nx][ny] = 0; // 다시 오지 못하도록 0 처리
      }
    }
  }

  return "미로를 탈출할 수 없습니다.";
};
