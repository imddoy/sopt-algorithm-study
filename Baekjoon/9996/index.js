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
    const N = parseInt(input[0]); // 파일의 개수
    const pattern = input[1]; // 패턴 문자열
    const files = input.slice(2); // 파일 이름 리스트

    // 패턴을 별표를 기준으로 앞부분과 뒷부분으로 분리
    const [prefix, suffix] = pattern.split("*");

    if (prefix === undefined || suffix === undefined) {
      console.log("Invalid pattern format"); // 패턴이 잘못되었을 경우 예외 처리
      process.exit();
    }

    // 각 파일 이름에 대해 패턴과 일치하는지 확인
    const results = files.map((file) => {
      if (
        file.length >= prefix.length + suffix.length && // 파일 길이가 앞뒤 부분보다 길거나 같아야 함
        file.startsWith(prefix) && // 파일이 prefix로 시작하는지 확인
        file.endsWith(suffix) // 파일이 suffix로 끝나는지 확인
      ) {
        return "DA";
      } else {
        return "NE";
      }
    });

    // 결과 출력
    console.log(results.join("\n"));
    process.exit();
  });
