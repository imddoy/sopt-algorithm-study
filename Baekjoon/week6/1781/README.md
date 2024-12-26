## 어떻게 문제에 접근했나요...?

1. 문제 하나당 걸리는 시간이 똑같다면, 데드라인별로 더 라면이 많은 것들을 선택해서 개수를 더하면 되지 않나???
   => 데드라인은 오름차순, 라면은 내림차순으로 정렬하고 데드라인이 겹치면 라면 값 비교해서 큰걸로 택하기~?

## 어떻게 풀었나요?

1. 데드라인, 라면 수 기준으로 배열 정렬
2. 문제들을 탐색하며 문제를 추가하기
3. 만약 추가한 문제의 데드라인보다 현재 추가한 문제들의 수가 크면 데드라인을 만족하지 못하기 때문에 가장 적은 라면의 문제를 제거하기
4. 탐색 끝나면 라면 수 출력

## 어려웠던 부분

- 동일한 데드라인 처리하기

문제들의 개수랑 데드라인을 비교하면 동일한 데드라인이 있는지 판단가능!
배열크기를 데드라인까지만 제한해서 초과 데이터는 즉시 제거하는 방식으로 배열의 크기를 제한하고 반복문으로 최소값을 탐색하기

```js
const selected = []; // 데드라인별 문제 관리
let totalRamen = 0;

for (const [deadline, ramen] of problems) {
  // 현재 문제 추가
  selected.push(ramen);
  totalRamen += ramen;

  // 데드라인 초과 시 가장 적은 라면 제거
  if (selected.length > deadline) {
    let minRamen = Infinity;
    let minIndex = -1;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] < minRamen) {
        minRamen = selected[i];
        minIndex = i;
      }
    }
    // 최소값 제거
    totalRamen -= minRamen;
    selected.splice(minIndex, 1);
  }
}
```
