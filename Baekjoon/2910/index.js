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
    const [N, C] = input[0].split(" ").map(Number);
    const sequence = input[1].split(" ").map(Number);

    const frequency = {};

    // 빈도 기록
    sequence.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1; // 숫자마다 빈도수 저장
    });

    // 빈도 내림차순
    const sortedSequence = sequence.slice().sort((a, b) => {
      return (
        frequency[b] - frequency[a] || sequence.indexOf(a) - sequence.indexOf(b) // 빈도가 같다면 입력 순서대로
      );
    });

    console.log(sortedSequence.join(" "));

    process.exit();
  });
