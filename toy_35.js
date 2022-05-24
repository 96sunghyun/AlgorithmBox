// 1. 2의 제곱이거나
// 2. 3의 제곱이거나
// 3. 5의 제곱이거나
// 4. 위 숫자들을 서로 곱한 값이거나
// = > uglyNumber
// => 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, ...

const uglyNumbers = function (n) {
  let result = [1];

  let firstIdx = 0;
  let secondIdx = 0;
  let thirdIdx = 0;

  while (result.length < n) {
    let ugly = Math.min(
      result[firstIdx] * 2,
      result[secondIdx] * 3,
      result[thirdIdx] * 5
    );
    result.push(ugly);
    if (result[firstIdx] * 2 === ugly) firstIdx++;
    if (result[secondIdx] * 3 === ugly) secondIdx++;
    if (result[thirdIdx] * 5 === ugly) thirdIdx++;
  }

  return result[result.length - 1];
};

result = uglyNumbers(8);
console.log(result); // --> 9

// notion : https://www.notion.so/test_35-uglyNumbers-368ecbde72e344e18e1ef6cfccdf2e5b
