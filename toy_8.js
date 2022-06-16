// 이 문제를 처음 봤을 때는 음수의 갯수가 홀수일 때, 짝수일 때, 절댓값이 클 때, 작을 때 등 여러 경우의 수가 생각났다.
// 그러나 다시 생각해보니 이는 N개의 수 중 3개를 뽑는 경우의 수만 모두 구하면 해결될 것 같다는 생각이 들었다.
// 그리고 이는 순열 알고리즘으로 해결할 수 있다.

const largestProductOfThree = function (arr) {
  const permutation = function (arr, num) { // 먼저 순열 함수를 생성한다.
    let result = []; // 정답을 담을 칸
    if (num === 1) return arr.map((el) => [el]); // basecamp : 재귀를 실행중에 주어진 num(select num)이 1이 되면 원하는 조합을 모두 뽑은 것이므로 반환한다.
    arr.forEach((fixed, idx, origin) => {
      let tail = origin.slice(idx + 1); // 첫째 element를 fixed로 두고, 이를 제외한 나머지 배열을 tail로 설정한다.
      let recursion = permutation(tail, num - 1); // tail과 함께 주어진 num에서 1을 뺀 숫자 기입하여 재귀함수로 실행시킨다.
      let addFix = recursion.map((el) => [fixed, ...el]); // 재귀함수에서 나온 결과요소들을 fixed와 합쳐준다음
      result.push(...addFix); // 그 결과값을 result에 push해준다.
    });
    return result; // 이렇게 되면 N개의 숫자에서 3개를 뽑는 모든 경우의 수가 마련되었다.
  };
  let result = permutation(arr, 3); // 주어진 arr에서 3개를 뽑는 모든 경우의 수에서
  let multiply = [].concat(
    result.map((el) => el.reduce((per, cur) => per * cur))// 그 모든 배열들을 각각 내부적으로 모든 element끼리 곱해준다.
  );
  return multiply.sort((a, b) => a - b)[multiply.length - 1]; //element끼리 곱한 값을 오름차순으로 정렬한 후 배열의 가장 마지막 숫자를 뽑는다.
};

let arr = [1, 2, 3, 4, 5];

let output = largestProductOfThree(arr, 3);

console.log(output);

// let result = [].concat(output.map((el) => el.reduce((pre, cur) => pre*cur)))
// console.log(result)
