## 어떻게 문제에 접근했나요...?

- n번째로 작은 수를 어떻게 구할 수 있지? 숫자를 하나씩 늘려보면서 666이 포함되어있는 것을 확인해야 하나? => 너무 비효율적인데....
- 666이 포함되어있는 수들을 가장 작은것부터 하나씩 수를 키우는게 가능할까? => 어떻게 포함되어있는 수를 키우지?
- 666을 포함하는 수는 숫자 앞과 뒤에 다른 숫자를 채우겠지? 근데 앞자리 수가 6보다 작으면 그냥 앞에 1씩 키워서 하나씩 증가하면 될 것 같아! n이 6보다 작다면 걍 앞에 1, 2, ... 키우면 될듯?
- 그렇지 않은 경우는 맨 앞자리에 1을 넣고 뒤에 늘리고~ 2를 넣고 뒤에 늘리고? => 무슨 규칙일까???? 자리수를 확인하면서 해야하는 걸까???

## 어떻게 풀었나요?

- 시간 복잡도는 O(N\*L) (N: 찾으려는 숫자의 개수, L: 숫자의 평균 길이) => N이 10000 이하니까 하나씩 숫자를 늘려도 문제 없음!

  - 대신 666부터 시작하기! => 불필요한 탐색 줄이기

## 어려웠던 부분

- 666 숫자를 만들고 정렬해서 값을 출력하는 방법

```js
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
    const results = [];
    const DEAD_NUM = "666";

    // 666 포함 숫자 만들기
    for (let prefix = 0; prefix < 10000; prefix++) {
      for (let suffix = 0; suffix < 1000; suffix++) {
        const number = `${prefix === 0 ? "" : prefix}${DEAD_NUM}${
          suffix === 0 ? "" : suffix
        }`;
        results.push(Number(number));
      }
    }

    results.sort((a, b) => a - b);
    console.log(results[N - 1]);

    readline.close();
  });
```

한번 시도해봤는데 로컬에서는 잘 나오지만, 살짝 오래걸리기는 함!!
그런데 백준에서 메모리초과라고 뜸...ㅜㅜ
**모든 숫자를 다 생성하니까** N이 작을 때 비효율적...!

    - 시간 복잡도

        - 숫자 생성: O(P × S) (P = prefix 범위, S = suffix 범위)
        - 정렬: O(R log R) (R = 총 숫자 수)
