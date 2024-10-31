const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line.trim());
  })
  .on("close", function () {
    // 답안
    const N = parseInt(input[0]); // 재료의 개수
    const M = parseInt(input[1]); // 값옷을 만드는데 필요한 수
    const arr = input.slice(2)[0].split(" ").map(Number); // 재료 배열

    let result = 0;

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (arr[i] + arr[j] === M) {
          // 재료 번호의 합이 M이라면 갑옷 수 증가
          result++;
        }
      }
    }

    console.log(result); // 결과 출력

    process.exit();
  });
