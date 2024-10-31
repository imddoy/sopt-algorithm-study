const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(parseInt(line));
  })
  .on("close", function () {
    // 답안
    const targetSum = 100; // 난쟁이 키의 목표 합
    const totalSum = input.reduce((acc, cur) => acc + cur, 0); // 전체 키의 합

    let result = [];

    // 난쟁이 2명 제외
    outerFor: for (let i = 0; i < input.length; i++) {
      // 첫번째 제외
      for (let j = i + 1; j < input.length; j++) {
        // 두번째 제외
        if (totalSum - input[i] - input[j] === targetSum) {
          // 2명을 찾았다면 필터링 후 이중 for문 나가기
          result = input.filter((_, idx) => idx !== i && idx !== j);
          break outerFor;
        }
      }
    }

    if (result.length > 0) {
      result.sort((a, b) => a - b).forEach((num) => console.log(num)); // 결과 출력
    } else {
      console.log("에러");
    }

    process.exit();
  });
