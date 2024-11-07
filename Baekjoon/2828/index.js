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
    const [N, M] = input[0].split(" ").map(Number); // 스크린 크기 N, 바구니 크기 M
    const J = parseInt(input[1]); // 사과 개수
    const apples = input.slice(2).map(Number); // 사과 떨어지는 위치 배열

    let left = 1; // 바구니 초기 위치(왼쪽 기준)
    let result = 0; // 총 이동 거리

    // 사과 담기
    for (let i = 0; i < J; i++) {
      // 왼쪽으로 이동
      if (apples[i] < left) {
        const distance = left - apples[i];
        result += distance;
        left -= distance;
      }
      // 오른쪽으로 이동
      else if (apples[i] > left + M - 1) {
        const distance = apples[i] - (left + M - 1);
        result += distance;
        left += distance;
      }
    }

    console.log(result);

    process.exit();
  });
