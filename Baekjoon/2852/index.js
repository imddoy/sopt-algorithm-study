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
    const N = parseInt(input[0]);
    const scores = input.slice(1).map((line) => {
      const [team, time] = line.split(" ");
      const [minutes, seconds] = time.split(":").map(Number);
      return { team: parseInt(team), time: minutes * 60 + seconds };
    });

    const TOTAL_TIME = 48 * 60; // 총 경기 시간 (초 단위)
    let team1Score = 0;
    let team2Score = 0;
    let team1Time = 0;
    let team2Time = 0;

    let currentTeam = 0; // 현재 이기고 있는 팀 (무승부로 초기화)
    let lastTime = 0; // 마지막 득점 시간

    for (let i = 0; i < N; i++) {
      const { team, time } = scores[i];

      // 현재 이기고 있는 팀 확인
      if (team1Score > team2Score) {
        currentTeam = 1;
      } else if (team2Score > team1Score) {
        currentTeam = 2;
      } else {
        currentTeam = 0;
      }

      // 이기고 있는 팀의 시간 계산
      if (currentTeam === 1) {
        team1Time += time - lastTime;
      } else if (currentTeam === 2) {
        team2Time += time - lastTime;
      }

      // 득점 점수 계산
      if (team === 1) {
        team1Score++;
      } else if (team === 2) {
        team2Score++;
      }

      // 시간 갱신
      lastTime = time;
    }

    // 마지막 득점 이후 남은 시간 처리
    if (team1Score > team2Score) {
      team1Time += TOTAL_TIME - lastTime;
    } else if (team2Score > team1Score) {
      team2Time += TOTAL_TIME - lastTime;
    }

    // 초를 다시 분으로
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    console.log(formatTime(team1Time));
    console.log(formatTime(team2Time));

    process.exit();
  });
