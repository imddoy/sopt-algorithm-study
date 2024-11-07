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
    const N = parseInt(input[0]); // 크기
    const video = input.slice(1).map((line) => line.split("").map(Number)); // 영상 저장

    // 영상 압축하기
    const compressVideo = (x, y, size) => {
      const standard = video[x][y]; // 기준 값 저장
      let isSame = true;

      // 해당 구역 탐색하기
      outerLoop: for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
          if (video[i][j] !== standard) {
            // 다른 값을 발견한다면 한 번에 루프를 빠져나옴
            isSame = false;
            break outerLoop;
          }
        }
      }

      // 모든 값이 같다면 해당 값 반환
      if (isSame) return String(standard);

      // 값이 다르면 구역 나누기
      const half = size / 2;
      const result = ["("];

      const directions = [
        [0, 0], // 기준
        [0, half], // 오른쪽
        [half, 0], // 아래
        [half, half], // 대각선
      ];

      for (const [dx, dy] of directions) {
        result.push(compressVideo(x + dx, y + dy, half));
      }

      result.push(")");
      return result.join("");
    };

    // 전체 영상에 대해 압축 실행
    console.log(compressVideo(0, 0, N));

    process.exit();
  });
