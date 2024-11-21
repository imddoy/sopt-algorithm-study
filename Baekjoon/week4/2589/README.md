## 어떻게 문제에 접근했나요...?

1. 최단거리 알고리즘 활용하기??

<details>
<summary>다익스트라 알고리즘 (Dijkstra's Algorithm)</summary>

- 단일 출발점에서 모든 노드까지의 최단거리 계산
- 가중치가 양수일 때만 사용 가능
- **우선순위 큐**를 활용해 효율적으로 동작
- 시간 복잡도: O(V²) (V는 노드의 수)
- 우선순위 큐 사용할 때 시간 복잡도: O((V + E) log V) (E는 간선의 수)

1. 시작 노드의 거리를 0으로 설정하고, 나머지 노드는 무한대
2. 우선순위 큐를 사용해서 방문하지 않은 노드 중 가장 가까운 노드 선택
3. 선택된 노드를 거쳐 다른 노드로 가는 거리 업데이트
4. 모든 노드를 방문할 때까지 반복

<details>
    <summary>구현 코드</summary>

```js
function dijkstra(graph, start) {
  const distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;

  const pq = [[0, start]]; // [거리, 노드]

  while (pq.length > 0) {
    const [currentDist, currentNode] = pq.shift(); // 우선순위 큐에서 최소 거리 노드 추출

    if (currentDist > distances[currentNode]) continue;

    for (const [nextNode, weight] of graph[currentNode]) {
      const newDist = currentDist + weight;

      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
        pq.sort((a, b) => a[0] - b[0]); // 우선순위 큐 유지
      }
    }
  }

  return distances;
}
```

</details>
</details>

<details>
<summary>벨만-포드 알고리즘 (Bellman-Ford Algorithm)</summary>

- 단일 출발점에서 모든 노드까지의 최단 거리 계산
- 가중치가 **음수**인 경우에도 사용 가능
- 시간 복잡도: O(V × E)

1. 시작 노드의 거리를 0으로 설정하고, 나머지 노드는 무한대
2. 모든 간선을 반복적으로 확인하며 거리값 업데이트
3. 음수 사이클이 존재하는지 확인하기 위해 한 번 더 반복하기

<details>
<summary>구현 코드</summary>

```js
function bellmanFord(graph, start) {
  const distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;

  for (let i = 0; i < graph.length - 1; i++) {
    for (const [u, v, weight] of graph) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }

  // 음수 사이클 검사
  for (const [u, v, weight] of graph) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      console.log("음수 사이클이 존재합니다.");
      return null;
    }
  }

  return distances;
}
```

</details>
</details>

<details>
<summary> 플로이드-워셜 알고리즘 (Floyd-Warshall Algorithm)</summary>

- 모든 쌍 간의 최단 거리 계산
- 음수 가중치가 있는 그래프에서도 사용 가능
- 시간 복잡도: O(V³)

1. 최단 거리 배열 초기화(직접 연결된 간선의 가중치, 연결안되면 무한대)
2. 각 노드를 중간 노드로 사용하여 거리 갱신 `dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])`

<details>
<summary>구현 코드</summary>

```js
function floydWarshall(graph) {
  const dist = graph.map((row) => [...row]); // 거리 배열 복사

  const V = graph.length;
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  return dist;
}
```

</details>
</details>
=> 가중치가 다 동일하기 때문에 의미가 없다!!!!!!!!!!!
2. 인접한 곳을 방문해야하니까 BFS, DFS 중에 선택하는데 최단 거리(**첫 방문이 최단거리**)를 구해야 하니까 노드를 **레벨별**로 탐색하는 BFS로 해결하자!!
3. 최단거리로 이동하는데 가장 먼곳 찾으려면...? => 최단거리를 다 구한 후 가장 큰 값을 구해야하나?

## 어떻게 풀었나요?

1. 지도에서 L찾아서 BFS
2. x좌표, y좌표, 거리를 큐에 담아서 탐색
3. 탐색하고 거리 max값 비교를 모든 L과 반복 반복

## 어려웠던 부분

- bfs로 탐색할때 가장 먼 거리를 계산하는 방법을 고민했는데, 모든 육지를 다 탐색하면서 육지별로 가장 먼 거리를 탐색하고 비교하는 방식으로 구현함!

- 오답노트
  `queue.push([nx, ny, ++distance])`로 거리를 증가했더니 에러가 났는데
  `distance`를 증가시켜버리면 모든 자식 노드한테 적용돼서 안됨!!!!!
