const decompression = function (image) {
  let result = [];

  // 1사분면을 만들어주는 함수
  const giveMeFirst = (arr) => {
    let mid = arr.length / 2;
    let first = [];
    for (let i = 0; i < mid; i++) {
      first.push(arr[i].slice(0, mid));
    }
    return first;
  };

  // 2사분면을 만들어주는 함수
  const giveMeSecond = (arr) => {
    let mid = arr.length / 2;
    let second = [];
    for (let i = 0; i < mid; i++) {
      second.push(arr[i].slice(mid));
    }
    return second;
  };

  // 3사분면을 만들어주는 함수
  const giveMeThird = (arr) => {
    let mid = arr.length / 2;
    let third = [];
    for (let i = mid; i < arr.length; i++) {
      third.push(arr[i].slice(0, mid));
    }
    return third;
  };

  // 4사분면을 만들어주는 함수
  const giveMeFourth = (arr) => {
    let mid = arr.length / 2;
    let fourth = [];
    for (let i = mid; i < arr.length; i++) {
      fourth.push(arr[i].slice(mid));
    }
    return fourth;
  };

  // 모든 요소가 통일되어있는지 확인해주는 함수
  // 통일되어있다면 통일된 값을 리턴해주고 그렇지 않다면 X를 리턴해준다.
  const isSame = (arr) => {
    if (arr[0][0] === 1) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[i][j] === 0) {
            return "X";
          }
        }
      }
      return "O";
    } else if (arr[0][0] === 0) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[i][j] === 1) {
            return "X";
          }
        }
      }
      return "O";
    }
  };

  // 전체 배열을 두고 recursive 돌리는 함수
  const isUnification = (arr) => {
    // 원소의 길이가 1이면(0 또는 1) 그대로 result 배열에 push 하고 함수를 마무리해준다.
    if (arr[0].length === 1) {
      result.push(String(arr[0][0]));
      return;
    }
    // 원소가 1로 통일되어있으면 result 배열에 1을 넣어준다.
    else if (arr[0][0] === 1 && isSame(arr) === "O") {
      result.push("1");
      return;
    }
    // 원소가 0으로 통일되어있으면 result 배열에 0을 넣어준다.
    else if (arr[0][0] === 0 && isSame(arr) === "O") {
      result.push("0");
      return;
    }
    // 원소가 통일되어있지 않다면, X를 넣어준 후, 각 사분면을 기준으로 isUnification 함수를 recursive 해준다.
    // 1사분면부터 나눠서 재귀함수에 들어간 후 2, 3, 4분면이 순서대로 들어가기 때문에
    // 문제에서 요구하는 순서에 맞춰 result 배열이 생성된다.
    else if (isSame(arr) === "X") {
      result.push("X");
      isUnification(giveMeFirst(arr));
      isUnification(giveMeSecond(arr));
      isUnification(giveMeThird(arr));
      isUnification(giveMeFourth(arr));
    }
  };
  isUnification(image);
  return result.join("");
};

let image = [
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 0, 0],
];

// image = [
//   [0, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0],
//   [1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 0, 1, 1],
//   [1, 1, 1, 1, 0, 1, 1, 1],
// ];

let result = decompression(image);
console.log(result); // --> 'XX100110X1100​'

// result = decompression(image);
// console.log(result); // --> 'X0X101X10101X00X10011'

// notion : https://www.notion.so/test_38-decompression-ee0700b3cf1144c8a5a180ab4e4afb9b
