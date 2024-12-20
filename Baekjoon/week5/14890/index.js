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
    const [N, L] = input[0].split(" ").map(Number);
    const map = input.slice(1).map((line) => line.split(" ").map(Number));

    let count = 0;

    const canPass = (road) => {
      const used = new Array(N).fill(false); // 경사로 설치 여부
      for (let i = 0; i < N - 1; i++) {
        if (road[i] === road[i + 1]) {
          // 높이가 같으면 계속 진행
          continue;
        } else if (road[i] + 1 === road[i + 1]) {
          // 올라가는 경사로
          if (i - L + 1 < 0) return false; // 경사로 범위를 벗어남
          for (let j = i; j > i - L; j--) {
            if (road[j] !== road[i] || used[j]) return false;
            used[j] = true; // 경사로 설치
          }
        } else if (road[i] - 1 === road[i + 1]) {
          // 내려가는 경사로
          if (i + L >= N) return false; // 경사로 범위 벗어남
          for (let j = i + 1; j <= i + L; j++) {
            if (road[j] !== road[i + 1] || used[j]) return false;
            used[j] = true; // 경사로 설치
          }
        } else {
          // 높이 차이가 1 이상이면 못 지나감
          return false;
        }
      }
      return true;
    };

    // 행 탐색
    for (let i = 0; i < N; i++) {
      if (canPass(map[i])) count++;
    }

    // 열 탐색
    for (let j = 0; j < N; j++) {
      const column = [];
      for (let i = 0; i < N; i++) {
        column.push(map[i][j]);
      }
      if (canPass(column)) count++;
    }

    console.log(count);
  });
