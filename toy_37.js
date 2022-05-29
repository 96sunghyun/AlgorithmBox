const coinChange = function (total, coins) {
  // 정답이 들어갈 변수 선언
  let cnt = 0;
  // 재귀함수 생성
  const aux = (total, coins) => {
    // 매 들어갈 배열의 첫 요소가 가장 작은 값이고, 그 값으로 total을 나눈 것 이상으로 반복할 필요가 없기 때문에 아래와 같이 i의 범위를 지정해준다.
    for (let i = 0; i <= Math.floor(total / coins[0]); i++) {
      // basecamp : 앞에서부터 coins 배열을 slice해주며 들어가다가, 길이가 1일 때 basecamp에 들어가게 된다.
      // coins.length === 1 이면 for문을 돌며 coins[0]*i와 total이 같아지는지 보고, 같아진다면 더 반복할 필요가 없기 때문에 cnt++, continue를 진행해준다.
      if (coins.length === 1) {
        // console.log(
        //   `[1의 개수 : ${10 - total}, 5의 개수 : ${i}], 나오는 숫자 : ${
        //     10 - total + 5 * i
        //   }`
        // );
        if (total === coins[0] * i) {
          cnt++;
          // console.log(`cnt++`);
          continue;
        }
      }
      // coins.length !== 1이면 아래와 같이 total, coins를 집어넣어 재귀하도록 한다.
      // for 문을 반복하면서 그 안에서 재귀(for문) 또 그 안에서 재귀(for문)이 반복되기 때문에 coins가 total이라는 숫자 이하에서 만들 수 있는 모든 조합이 형성된다.
      // 예시로 total = 10, coins = [1, 5]를 aux 함수에 부여했을 때 나오는 결과는 아래와 같다.
      /*
        [1의 개수 : 0, 5의 개수 : 0], 나오는 숫자 : 0
        [1의 개수 : 0, 5의 개수 : 1], 나오는 숫자 : 5
        [1의 개수 : 0, 5의 개수 : 2], 나오는 숫자 : 10
        cnt++
        [1의 개수 : 1, 5의 개수 : 0], 나오는 숫자 : 1
        [1의 개수 : 1, 5의 개수 : 1], 나오는 숫자 : 6
        [1의 개수 : 2, 5의 개수 : 0], 나오는 숫자 : 2
        [1의 개수 : 2, 5의 개수 : 1], 나오는 숫자 : 7
        [1의 개수 : 3, 5의 개수 : 0], 나오는 숫자 : 3
        [1의 개수 : 3, 5의 개수 : 1], 나오는 숫자 : 8
        [1의 개수 : 4, 5의 개수 : 0], 나오는 숫자 : 4
        [1의 개수 : 4, 5의 개수 : 1], 나오는 숫자 : 9
        [1의 개수 : 5, 5의 개수 : 0], 나오는 숫자 : 5
        [1의 개수 : 5, 5의 개수 : 1], 나오는 숫자 : 10
        cnt++
        [1의 개수 : 6, 5의 개수 : 0], 나오는 숫자 : 6
        [1의 개수 : 7, 5의 개수 : 0], 나오는 숫자 : 7
        [1의 개수 : 8, 5의 개수 : 0], 나오는 숫자 : 8
        [1의 개수 : 9, 5의 개수 : 0], 나오는 숫자 : 9
        [1의 개수 : 10, 5의 개수 : 0], 나오는 숫자 : 10
        cnt++
      */
      else {
        aux(total - coins[0] * i, coins.slice(1));
      }
    }
  };
  aux(total, coins);
  return cnt;
};

let total = 10;
let coins = [1, 5];
let output = coinChange(total, coins);
console.log(output); // --> 3

// total = 4;
// coins = [1, 2, 3];
// output = coinChange(total, coins);
// console.log(output); // --> 4 ([1, 1, 1, 1], [1, 1, 2], [2, 2], [1, 3])

// notion : https://www.notion.so/test_37-coinChange-bdfb70453f144e5db659033806551708
