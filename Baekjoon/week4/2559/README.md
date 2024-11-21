## 어떻게 문제에 접근했나요...?

1. 연속된 수의 합을 다 구하고 가장 큰값을 선택하면 되니까 반복문을 돌려서 큰 값 구하면될듯 <br />
   => 더하는 개수는 1부터 K까지, 1부터 K-더하는 개수까지 이중 for문돌리면 될듯...? 그리고 다 더하면 max값 비교하자

## 슬라이딩 윈도우 알고리즘 (Sliding Window)

- 고정 사이즈의 윈도우가 이동하면서 윈도우 내에 있는 데이터를 이용해 문제를 풀이하는 알고리즘
- 교집합의 정보를 공유하고, 차이가 나는 양쪽 끝 원소만 갱신하는 방법
- 배열이나 리스트의 요소의 일정 범위의 값을 비교할 때 사용
- 투포인터 알고리즘이랑 연동해서 많이 사용

  - 1차원 배열이 있고 이 배열에서 각자 다른 원소를 가리키는 2개의 포인터를 조작하며 원하는 값을 얻는 형태
  - 투 포인터 알고리즘은 구간의 넓이 조건에 따라 유동적으로 변하고, 슬라이딩 윈도우 알고리즘은 항상 구간의 넓이가 고정되어있다는 차이점 <br />

## 어떻게 풀었나요?

> 더하는 값이 항상 고정되어있으니까 슬라이딩 윈도우 알고리즘을 활용하기!!

1. 초기값을 계산하고 기억하기
2. 차이가 나는 양쪽 끝 값을 갱신하기(추가 값 더하고, 맨 앞의 값 빼기)

## 어려웠던 부분

- 오답노트

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
    const [N, K] = input[0].split(" ").map(Number);
    const arrayT = input[1].split(" ").map(Number);

    let maxSum = -100;
    let sum = 0;

    for (let i = 0; i <= N - K; i++) {
      sum = 0;
      for (let j = 0; j < K; j++) {
        sum += arrayT[i + j];
      }
      maxSum = maxSum > sum ? maxSum : sum;
    }

    console.log(maxSum);

    process.exit();
  });
```

🤔 이렇게 했더니 왜 시간초과가 나오지......????<br />
=> 현재 내 코드는 시간 복잡도가 `O(N*K)`가 나오니까 시간초과가 나오는듯....
=> 슬라이딩 윈도우를 활용해서 해결하자‼️

- `reduce` 사용

```js
let sum = arrayT.slice(0, K).reduce((acc, curr) => acc + curr, 0);
```

reduce를 쓰면 코드가 한줄로 처리가 되니까 더 좋아보였는데,,,
메모리가 더 많이 차지해서 알아보니까

`arrayT.slice(0, K)`는 새로운 배열을 생성하기 떄문에 메모리 사용량이 증가해서 효율적인 코드는 아닌듯...(메모리가 `K*(배열 요소 크기)`만큼 추가됨...)

코드가 많이 길어지는거 아니니까 그냥 for문 쓰자!!!
