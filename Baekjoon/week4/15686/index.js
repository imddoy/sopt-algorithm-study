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
    const city = input.slice(1).map((line) => line.split(" ").map(Number));

    const homes = [];
    const chickens = [];

    // 집,치킨집 위치 저장
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (city[x][y] === 1) homes.push([x, y]);
        if (city[x][y] === 2) chickens.push([x, y]);
      }
    }

    // M개 치킨집 뽑기
    const selectChicken = (array, M) => {
      if (M === 1) return array.map((v) => [v]);
      const result = [];
      array.forEach((store, index, origin) => {
        const rest = origin.slice(index + 1);
        const newSelect = selectChicken(rest, M - 1);
        const attached = newSelect.map((select) => [store, ...select]);
        result.push(...attached);
      });
      return result;
    };

    const selectedChicken = selectChicken(chickens, M);

    // 도시의 치킨 거리 계산
    let minCityChicken = Infinity;

    for (const chicken of selectedChicken) {
      let cityChicken = 0;

      for (const [homeX, homeY] of homes) {
        let minChickenDistance = Infinity;

        for (const [chickenX, chickenY] of chicken) {
          const distance =
            Math.abs(homeX - chickenX) + Math.abs(homeY - chickenY);
          minChickenDistance = Math.min(minChickenDistance, distance);
        }

        cityChicken += minChickenDistance;
      }

      minCityChicken = Math.min(minCityChicken, cityChicken);
    }

    console.log(minCityChicken);

    process.exit();
  });
