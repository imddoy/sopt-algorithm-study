## 어떻게 문제에 접근했나요...?

1. 각 집마다 최단거리인 치킨집 좌표를 카운팅 해서 가장 높은 순서대로 M만큼 고른 후 거리 모두 더하기
   => 집마다 각자 가까운 치킨집이 다르기 때문에 치킨거리의 합이 최소일거라는 보장이 안됨...!!!

2. M개의 조합을 먼저 고른 후 치킨거리 계산해서 최소값 찾기! => 거리는 어떻게 계산하지?? => 좌표를 저장해서 하나하나 계산하기...

## 어떻게 풀었나요?

1. 도시에서 집이랑 치킨집 좌표 저장
2. 치킨집 M개 뽑기
3. 조합마다 도시 치킨 거리 계산하고 최소값 구하기

   3-1. 조합의 집마다 치킨거리 구하고 누적하기

## 어려웠던 부분

- 치킨집 M개를 어떻게 뽑지...?
  => 재귀적으로 조합을 생성하기 (배열에서 하나씩 뽑기를 재귀적으로 반복함)
  => 배열을 `forEach`문을 사용해서 요소, index, 원본을 이용해서 요소를 고르고, 나머지 요소 중에서 재귀호출로 요소 고르기 반복해서 고른 요소들을 모아서 하나의 배열에 `push`
  => 한 요소가 M개의 배열로 이루어진 조합의 경우들이 한 배열로 저장됨!!

- 거리 최솟값 초기화를 뭘로 하지...??????? 가장 작은 값이면 0으로 하는데 가장 큰 값은?? => `Infinity`는 전역 객체의 속성으로 JS에서 가장 큰 숫자