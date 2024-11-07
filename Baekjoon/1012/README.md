## 어떻게 문제에 접근했나요...?

1. 테스트를 반복할 수 있도록 입력 케이스를 나눠야 하나? <br />
   => 테스트 케이스 T만큼 반복할 수 있도록 하자
2. K개의 (x,y)좌표가 주어지니까 x좌표랑 y좌표가 연결되는 부분이 있는지를 확인해야 할듯... 근데 그 기준을 어떻게 잡아야 하지....
3. 이어지는 구역(?)들을 찾을 때마다 1씩 증가시켜야 하나,,, 아니면 어디에 따로 저장을 해둬서 그 길이를 반환시켜야 하는걸까...? <br />
   => 이어지는 곳이 있다면 안이어질 때까지 찾고나서 카운트 증가하는게 더 코드가 간단할듯!!

## BFS란?

| 최단 경로 문제에서는 BFS로 접근하자!

- 너비 우선 탐색(Breadth-First Search)
- 인접한 노드를 먼저 탐색하는 알고리즘
- 시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져있는 정점을 나중에 방문하는 순회 방법
- **두 노드 사이의 최단 경로** 혹은 **임의의 경로**를 찾고 싶을때 선택한다 => 이 문제와 적합한 이유!!!!
- BFS는 방문한 노드들을 차례로 저장한 후 꺼낼 수 있는 자료구조인 **큐(Queue)를 사용**한다.
  - FIFO 원칙으로 탐색
  - 일반적으로 큐를 이용해서 반복적 형태로 구현하는 것이 가장 잘 동작
- 시간 복잡도
  - 인접 리스트로 표현된 그래프: O(N+E)
  - 인접 행렬로 표현된 그래프: O(N^2) <br />
    => 여기서 의문!! 그렇다면 2차원 배열이 아니라 리스트로 접근해야하나??? <br />
    => 배추밭도 상하좌우(?)같은 형태로 이루어져 있기 때문에, E는 항상 상하좌우로 연결된 칸이므로 시간 복잡도 차이가 없어서 2차원 배열로 접근하는 것이 더 효율적인 코드인듯...!

### BFS 구현 예시 코드

```js
function BFS(graph, start, visited) {
  const queue = new Queue();
  queue.push(start);
  visited[start] = true;

  while (queue.size()) {
    const v = queue.popleft();
    console.log(v);

    for (const node of graph[v]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    }
  }
}

const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(6).fill(false);
BFS(graph, 0, visited);
// 0 1 2 4 5 3
```

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

| 이 문제는 모든 노드를 다 확인해야 해서 DFS가 더 적합하다고 판단!

1. 입력 값에서 테스트 케이스를 받아와서 케이스 반복하기
2. 배추 위치를 2차원 배열로 저장하기
3. 배추밭 전체를 탐색하도록 반복문

   - 배추 발견하면 지렁이 증가!
   - 인접한 배추 찾기 => 인접한 배추 없을 때까지 반복문
     - 여기서는 동일한 지렁이기 때문에 새로 지렁이를 증가할 필요없음

=> 총 3개의 반복문 사용

## 어려웠던 부분

- 이제 input을 받아오는게 케이스별로 반복되어야 하니까 해당줄을 매칭하는게 까다로워서 어려웠음. inputRow를 따로 설정해서 계속 입력받고 한줄 증가시키는 방식으로 해결이 가능했음.
