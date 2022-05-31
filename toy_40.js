// str에 대해서 for문을 돌다가 str[i]의 앞과 뒤가 같으면 그 부분이 mid가 된다.
// 그 안에서 mid를 중심으로 양옆으로 반복문을 돌려서 앞 뒤가 같으면 tempCount를 ++해준다.
// 그 for문이 끝난 후 tempCount가 count보다 크면 count를 tempCount로 업데이트 해준다.

let longestPalindrome = function (str) {
  // 정답이 들어갈 변수 선언
  let count = 0;

  // str에 대해서 for문을 돌려준다.
  for (let i = 0; i < str.length; i++) {
    // 정답이 홀수인 경우 ex) "daaad"
    // for 문을 돌다가 str[i]의 앞, 뒤가 같으면 max palidrome이 될 가능성이 있기 때문에 검사를 시작한다.
    if (i > 0 && str[i - 1] === str[i + 1]) {
      // 임시로 정답을 저장할 변수 선언
      // 이미 str[i]는 공통적으로 갖고있는 요소이기 때문에 초기값으로 1을 추가해준다.
      let tempCount = 1;

      for (let j = 1; j < str.length; j++) {
        // 만약 str[i]를 기준으로 j는 1부터 str[i-j]가 같으면 그 길이를 temp에 넣어준다. 한 번 같을 때 두 개씩 도출되기 때문에 +2씩 해준다.
        if (str[i - j] === str[i + j]) {
          // 앞/뒤로 길이가 다를 것이기 때문에 str[i - j]이나 str[i + j] 이 str의 최대/최소값을 넘어가면 undefined가 되고, 그럴 경우에는 연산을 중지한다.
          if (str[i - j] === undefined || str[i + j] === undefined) {
            break;
          }
          tempCount = tempCount + 2;
        }
        // str[i - j]와 str[i + j]가 같은 경우에는 연산을 계속 해 나가지만, 하나라도 어긋나면 바로 연산을 중단한다.
        else {
          break;
        }
      }
      // 저장한 tempCount가 이전 count 변수보다 클 경우, count를 tempCount로 업데이트한다.
      if (tempCount > count) {
        count = tempCount;
      }
    }
    // 정답이 짝수인 경우 ex) "daad"
    // 이 경우에는 위 처럼 str[i]를 중심으로 나눌 수 없다. 그래서 아래와 같이 분류를 해주었다.
    else if (i > 0 && str[i] === str[i + 1] && str[i - 1] === str[i + 2]) {
      // 이미 str[i] === str[i+1]인 상태이기 때문에 tempCount에 2를 먼저 넣어준다.
      let tempCount = 2;
      for (let j = 1; j < str.length; j++) {
        // str[i] === str[i+1]을 전제로 시작했기 때문에, str[i-1] === str[i+2]로 전제조건을 제시한다.
        if (str[i - j] === str[i + j + 1]) {
          if (str[i - j] === undefined || str[i + j + 1] === undefined) {
            break;
          }
          tempCount = tempCount + 2;
        } else {
          break;
        }
      }
      if (tempCount > count) count = tempCount;
    }
    // for i 문은 0부터 시작한다. 이 때 주어진 str의 길이가 0이면 str[i] === undefined 일 것이고 1이라면 0일 때 str[i + 1] === undefined 가 될 것이다.
    // 이 때는 str의 길이를 return 해준다.
    else if (str[i] === undefined || (i === 0 && str[i + 1] === undefined)) {
      return str.length;
    }
  }
  return count;
};

// let str = "My dad is a racecar athlete";
// let result = longestPalindrome(str);
// console.log(result); // --> 11 ('a racecar a')

str = "There is a tattarrattat   ";
result = longestPalindrome(str);
console.log(result); // --> 5 (' dad ')

str = "abc";
console.log(str[3]);

// notion : https://www.notion.so/test_40-longestPalindrome-6b2a3c6580b6484bb8cea5cbcacda9a0
