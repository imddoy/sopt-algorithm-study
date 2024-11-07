## 어떻게 문제에 접근했나요...?

1. 첫줄 입력값에 따라 범위랑 사각형 개수 저장해야 할듯
2. 각 줄마다 x기준(첫번째값~두번째값)으로 1넣고 y(첫번째값~두번째값)으로 1넣으면 2차원 배열에 저장이 잘 되려나?
3. 이제 0으로 남아있는 부분들 구역찾기 반복하는데, 이번에는 카운팅을 무조건 해서 더해주어서 넓이를 배열에 저장해야 할듯....?

## DFS란?

| 모든 노드를 방문할 때 DFS로 접근하자!

- 깊이 우선 탐색(Depth-First Search)
- 루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 알고리즘
- 넓게 탐색하기 전에 깊게 탐색
- 자기 자신을 호출하는 **순환 알고리즘**
- **어떤 노드를 방문했었는지 여부를 반드시 검사해야 함**
- 구현 방법 2가지
  1. 순환 호출 이용
     - 동작 방식
       - 방문 여부를 기록하기 위해 배열 visited를 사용하며, 배열 visited의 값을 false로 초기화한다.
       - 노드를 방문할 때마다 해당 노드의 visited 배열 값을 true로 변경한다.
       - 해당 노드(v)와 연결된 노드 중에 방문하지 않은 노드(node)이 있다면 방문하지 않은 노드(node)를 시작점으로 하여 DFS를 다시 시작한다.
  2. 명시적인 스택 사용: 명시적인 스택을 사용하여 방문한 정점들을 스택에 저장하였다가 다시 꺼내어 작업
     - 스택에 시작 노드를 push 한다.
     - 스택에서 노드를 pop하고 해당 노드(v)가 방문하지 않은 노드라면 방문처리 한다.
     - 노드(v)와 연결된 노드 중에서 방문하지 않은 노드(node)이 있다면 stack에 push 한다.
     - 스택의 길이가 0이 될 때까지 2, 3번 과정을 반복한다.
- 시간 복잡도
  - 인접 리스트: O(N+E)
  - 인접 행렬: O(N^2)

### DFS 구현 예시 코드

- 재귀(순환 호출)

```js
function dfs(graph, v, visited) {
  // 현재 노드를 방문 처리
  visited[v] = true;
  console.log(v);

  // 현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for (let node of graph[v]) {
    if (!visited[node]) {
      dfs(graph, node, visited);
    }
  }
}

const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(7).fill(false);

dfs(graph, 0, visited);
// 0 1 5 2 4 3
```

- 스택

```js
function dfs(graph, start, visited) {
  const stack = [];
  stack.push(start);

  while (stack.length) {
    let v = stack.pop();
    if (!visited[v]) {
      console.log(v);
      visited[v] = true;

      for (let node of graph[v]) {
        if (!visited[node]) {
          stack.push(node);
        }
      }
    }
  }
}
const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(7).fill(false);

dfs(graph, 0, visited);
// 0 4 3 2 5 1
```

## 어떻게 풀었나요?

1. 종이랑 사각형 정보를 가져와서 이중 반복문으로 사각형이 있는 부분은 2차원 배열에서 1로 저장
2. 종이를 탐색하도록 반복문

   - 빈구역이 있으면 넓이를 1 증가
   - 인접한 빈구역 찾기 => 빈구역 없을 때까지 1씩 넓이를 증가하면서 반복문(끝날 때 넓이 배열에 추가)

3. 넓이 배열의 길이와 그 값을 오름차순으로 출력

## 어려웠던 부분

- 이번엔 스택을 사용해서 풀었는데 잘 안사용해보던 방법이라 어려웠음. 그냥 배열을 스택처럼 접근하면서 해결함(push랑 pop 사용하기)
