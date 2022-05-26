// const coinChange = function (total, coins) {
//   let numbericVowel = [];
//   let result = [];

//   for (let i = 0; i < coins.length; i++) {
//     numbericVowel.push(Array(total).fill(coins[i]));
//   }

//   numbericVowel = numbericVowel.flat();

//   for (let i = 0; i < numbericVowel.length; i++) {
//     let temp = [numbericVowel[i]];

// if (numbericVowel[i] === coins[coins.length - 1]) {
//   if (total % numbericVowel[i] === 0) {
//     result.push(Array(total / numbericVowel[i]).fill(numbericVowel[i]));
//     break;
//   } else {
//     break;
//   }
// }

//     for (let j = i + 1; j < numbericVowel.length; j++) {
//       temp.push(numbericVowel[j]);
//       let addTemp = temp.reduce((acc, cur) => acc + cur);
//       if (addTemp === total) {
//         result.push(temp);
//         break;
//       } else if (addTemp > total) {
//         break;
//       }
//     }
//   }
//   return result;
// };

// naive solution

const coinChange = function (total, coins) {
  const makeChageFrom = (left, idx) => {
    if (left === 0) return 1;
    let cnt = 0;
    // 지금 사용하고 있는 동전부터만 고려한다.
    for (let i = idx; i < coins.length; i++) {
      if (left - coins[i] >= 0) {
        // 가장 앞에 있는 (가장 작은) 숫자로부터 전체 토탈에서 한 번씩 빼며 진행한다.
        // 마지막 맨 아래까지 도달하면 거기서부터 다시 올라오면서 재귀되어있는 for문에서 또다시 다음 요소로 분기가 일어난다.
        // 그렇게해서 나올 수 있는 모든 경우의 수를 세어 total과 딱 맞게 나누어떨어지면 cnt를 ++ 하여 체크한다.
        cnt = cnt + makeChageFrom(left - coins[i], i);
      }
    }

    return cnt;
  };
  // 0번째 동전부터 사용한다.
  return makeChageFrom(total, 0);
};

// total = 6;
// coins = [1, 2, 3];
// output = coinChange(total, coins);
// console.log(output); // --> 7 ([1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 3], [1, 2, 3], [1, 1, 2, 2], [2, 2, 2], [3, 3])

let total = 10;
let coins = [1, 5];
let output = coinChange(total, coins);
console.log(output); // --> 3

/* // simpler recursion
// and dynamic programming with memoization: O(M * N)
const coinChange = function (total, coins) {
  // memo[i][j]는 i만큼의 금액을 coins[j]부터 ~ coins[coins.length - 1]까지 사용하여 만들 수 있는 경우의 수를 저장
  const memo = [];
  for (let i = 0; i < total + 1; i++) memo.push(Array(coins.length).fill(-1));
  const makeChageFrom = (left, idx) => {
    // 0을 만드는 방법은 1가지이다. 아니면 목표 금액을 만들었다고 생각해도 된다.
    if (left === 0) return 1;
    // 금액이 마이너스가 되는 경우는 불가능하므로 0을 리턴
    if (left < 0) return 0;
    // 동전을 전부 검토해서, 남아있는 새로운 동전은 없는데 목표 금액을 만들지 못한 경우 (실패)
    if (idx >= coins.length && left > 0) return 0;
    // 이미 해결한 적이 있는 문제는 다시 풀지 않는다.
    if (memo[left][idx] !== -1) return memo[left][idx];

    // left만큼의 금액을 coins[idx]부터 사용하여 만들 수 있는 경우의 수는
    //  1) coins[idx]는 그만 사용하고, 다음 동전으로 넘어가거나 (목표 금액은 그대로이고, idx가 증가한다.)
    //  2)) coins[idx]를 한번 더 사용한다. coins[idx]를 또 사용할 수 있으므로, idx는 그대로이고, 목표 금액은 coins[i]만큼 줄어든다.
    memo[left][idx] =
      makeChageFrom(left, idx + 1) + makeChageFrom(left - coins[idx], idx);
    return memo[left][idx];
  };

  return makeChageFrom(total, 0);
};

// dynamic programming with tabulation: O(M * N)
// const coinChange = function (total, coins) {
//   // table[i][j]는 coins[j]까지 사용해서 i만큼의 금액을 만들 수 있는 경우의 수를 저장
//   const table = [];
//   for (let i = 0; i < total + 1; i++) table.push(Array(coins.length).fill(0));
//   // 모든 경우에 0을 만들 수 있는 경우는 1 (base case)
//   for (let i = 0; i < coins.length; i++) table[0][i] = 1;

//   for (let amount = 1; amount <= total; amount++) {
//     // 작은 금액부터 차례대로 경우의 수를 구한다. (bottom-up)
//     for (let idx = 0; idx < coins.length; idx++) {
//       let coinIncluded = 0;
//       if (amount - coins[idx] >= 0) {
//         coinIncluded = table[amount - coins[idx]][idx];
//       }

//       let coinExcluded = 0;
//       if (idx >= 1) {
//         // 동전을 순서대로 검사하고 있기 때문에, 바로 직전의 경우만 고려하면 된다.
//         // 단, 0번째 동전은 직전이 없으므로 제외한다.
//         coinExcluded = table[amount][idx - 1];
//       }

//       table[amount][idx] = coinIncluded + coinExcluded;
//     }
//   }

//   return table[total][coins.length - 1];
// };
 */

// notion : https://www.notion.so/test_37-coinChange-bdfb70453f144e5db659033806551708
