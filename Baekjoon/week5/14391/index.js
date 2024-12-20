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
    const paper = input.slice(1);
    let maxSum = 0;

    const totalMasks = 1 << (N * M); // 총 2^(N * M)개의 비트마스크
    for (let mask = 0; mask < totalMasks; mask++) {
      let sum = 0;

      // 가로 조각 계산
      for (let i = 0; i < N; i++) {
        let rowSum = 0;
        for (let j = 0; j < M; j++) {
          // 행 단위
          const index = i * M + j; // 현재 칸의 비트마스크 위치
          if ((mask & (1 << index)) === 0) {
            rowSum = rowSum * 10 + parseInt(paper[i][j]);
          } else {
            sum += rowSum;
            rowSum = 0;
          }
        }
        sum += rowSum; // 마지막 가로 조각 합
      }

      // 세로 조각 계산
      for (let j = 0; j < M; j++) {
        let colSum = 0;
        for (let i = 0; i < N; i++) {
          // 열 단위
          const index = i * M + j; // 현재 칸의 비트마스크 위치
          if ((mask & (1 << index)) !== 0) {
            colSum = colSum * 10 + parseInt(paper[i][j]);
          } else {
            sum += colSum;
            colSum = 0;
          }
        }
        sum += colSum; // 마지막 세로 조각 합
      }
      maxSum = Math.max(maxSum, sum);
    }

    console.log(maxSum);
  });
