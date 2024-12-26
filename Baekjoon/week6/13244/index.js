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
    const T = parseInt(input[0]);
    let idx = 1; // 테스트 케이스 시작 위치
    const results = [];

    for (let t = 0; t < T; t++) {
      const N = parseInt(input[idx]);
      const M = parseInt(input[idx + 1]);
      idx += 2; // 다음 테스트 케이스를 위해 위치 조정

      const edges = input
        .slice(idx, idx + M)
        .map((line) => line.split(" ").map(Number));
      idx += M;

      // 엣지 수 확인
      if (M !== N - 1) {
        results.push("graph");
        continue;
      }

      // 리스트 세팅
      const graph = Array.from({ length: N + 1 }, () => []);
      for (const [u, v] of edges) {
        // u에 v, v에 u(양방향 연결)
        graph[u].push(v);
        graph[v].push(u);
      }

      // 리스트 탐색
      const visited = Array(N + 1).fill(false);
      let isTree = true;

      const dfs = (node, parent) => {
        visited[node] = true;
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            // 방문하지 않은 인접 노드 탐색
            if (!dfs(neighbor, node)) return false;
          } else if (neighbor !== parent) {
            //  이미 방문한 노드일 때 부모 노드가 아니면 사이클
            return false;
          }
        }
        return true;
      };

      // DFS 시작
      if (!dfs(1, -1)) {
        isTree = false;
      }

      // 방문하지 않은 노드가 있으면
      if (visited.some((v, i) => i > 0 && !v)) {
        isTree = false;
      }

      results.push(isTree ? "tree" : "graph");
    }

    // 결과 출력
    console.log(results.join("\n"));
  });
