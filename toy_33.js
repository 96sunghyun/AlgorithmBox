// 원래 답 => Advanced 하나 통과 안 됨.
const LIS = function (arr) {
  // 정답을 넣어줄 변수
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    // for 문이 한 번 돌 때마다 max값을 1로 변경해준다.
    let max = 1;
    // 크기 비교를 위해 임시로 지정해주는 값. for i문이 시작될 때 이 값을 arr[i]로 만들어준다.
    let temp = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      // temp의 값을 arr[i]로 시작했을 때, temp보다 arr[j]값이 더 크면 일단 정렬되어있는것이기 때문에 max++ 해준다.
      // 동시에 temp에 arr[j]의 값을 넣어준다.
      if (temp < arr[j]) {
        max++;
        temp = arr[j];
      }
      // 이제 temp는 arr[j]이다. 그런데 temp뒤의 값이 temp 앞의 값보다 크고 temp의 값보다 작다면 어차피 현재 j값에서 정렬은 끝난것이다.
      // 그렇기때문에 아무 액션도 하지 않고 temp에 arr[j+1] 값을 넣어준다.
      // 이렇게 하면 다음 for j문이 돌 때 두 개의 if문에 모두 해당하지 않기때문에 j++가 되고, 그렇게 된다면 temp는 그 시점의 arr[j]요소의 직전값인 것이 된다.
      if (arr[j - 1] < arr[j + 1] && arr[j + 1] < temp) {
        temp = arr[j + 1];
      }
    }
    // 하나의 for 문에 끝난 후 차곡차곡 더해진 max의 값이 result값보다 크다면 계속해서 result에 max 값을 덮어씌워준다.
    if (max > result) result = max;
  }
  return result;
};

output = LIS([7, 2, 6, 4, 5, 1, 3]);
console.log(output); // --> 3 (3, 10, 20)

// 복잡도를 개선해서 Advanced 통과된 코드
const LIS2 = function (arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    let max = 1;
    let temp = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      // 첫번째 코드에서는 모든 경우의 수에 if문을 두 번이나 거치게 되어 시간복잡도가 높아졌던 것 같다.
      // 아래 코드에서는 if와 else if 문으로 구분하여, 한 번에 많아도 하나의 조건문만 거치게 해주었다.

      // 처음에는 temp에 arr[i] 값을 넣어준다. 아래 조건문에서는 temp < arr[j+1] < arr[j] 일 경우에 continue를 사용해서 건너뛰어준다.
      // 그 이유는 어차피 arr[j]의 값보다 arr[j+1]의 값이 작기 때문에 arr[j]에서 연속된 정렬이 끊기게 되고
      // arr[j+1]는 temp보다 크기때문에 arr[j]에서 for j문이 한번 더 돌아서 arr[j+1]로 갔을 때 temp값 변경과 동시에 max의 숫자를 ++1 해주는것이 효율적이기 때문이다.
      // 그래서 아래의 경우에는 continue를 통해 다음 j값으로 건너뛰어준다.
      if (temp < arr[j + 1] && arr[j + 1] < arr[j]) {
        continue;
      }
      // 만약 위 if문에 해당되지 않아서 아래 else if문으로 들어왔다는 것은 arr[j]가 temp보다 크고, arr[j+1]이 arr[j]보다 크다는 뜻이다.
      // 이런 경우에는 max값을 ++1해줌과 동시에 temp 값을 arr[j]로 업데이트해주어 다음 for j문이 돌 때 지정된 temp에 대해서 if문이 실행될 수 있도록 해준다.
      else if (temp < arr[j]) {
        max++;
        temp = arr[j];
      }
    }
    if (max > result) result = max;
  }
  return result;
};
