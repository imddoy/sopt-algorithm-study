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
    const [A, B, C] = input[0].split(" ").map(Number); // 주차 요금
    const parkingTime = input
      .slice(1)
      .map((line) => line.split(" ").map(Number));
    const timeTable = new Array(100).fill(0); // 주차 시간표 (주차한 차의 수)
    const parkingFeeTable = [0, A, B * 2, C * 3]; // 주차 요금표

    // 각 트럭의 주차 시간 체크
    parkingTime.forEach(([start, end]) => {
      for (let i = start; i < end; i++) {
        timeTable[i]++; // 주차한 차의 수 증가
      }
    });

    // 총 요금 계산
    let result = timeTable.reduce((acc, cur) => acc + parkingFeeTable[cur], 0);

    console.log(result); // 결과 출력

    process.exit();
  });
