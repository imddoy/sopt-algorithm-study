## 어떻게 문제에 접근했나요...?

1. 사과 위치에 맞게 이동해야하는데, 바구니 크기만큼 덜 가도록 할 수 있겠네... 근데 그 덜 가는 것에 대한 기준을 어떻게 세워야 하지.... 방향이 같으면 계속 바구니만큼 덜 가도 되고, 방향이 다르면 한번만 덜 가도 되는건가...? 그러면 방향 바뀌는걸 처리해야 하나?<br />
   => 계속 이걸 처리하느니... 배열에 바구니 위치랑 사과 위치를 받아서 겹칠 때까지 이동시키는 거리를 계산하는게 더 코드 작성하기 편하지 않을까?

## 어떻게 풀었나요?

1. 바구니 초기 위치 왼쪽 좌표를 기준으로 이동 거리 계산하기
2. 이동방향을 구분해서 이동거리 계산하기 사과 개수만큼 반복

## 어려웠던 부분

- 이동거리를 계속 바구니의 왼쪽 오른쪽을 바꿔서 생각하려니까 어려웠는데 그냥 왼쪽을 기준으로 잡고 계산했더니 조금 더 편해진 느낌...? 근데 이것보다 더 좋은 방법 있을 것 같은데 모르겠음...
