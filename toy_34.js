// 1. for문으로 str1의 길이만큼 돌며 str에 str의 요소가 있는지 확인한다.
// 2. str1에 있는 요소를 str2에서 찾았다면, 이후 검색은 그 다음 요소부터 시작해야하기 때문에 찾은 이후 해당 요소의 index+1부터 슬라이스하여 다시 str2으로 대입하고 돌려준다.
// 3. 최적화를 위해 위에서 str1의 요소를 str2에서 찾은 순간, index+1부터 슬라이스해줌과 동시에 해당 for문은 break해준다.
// 4. 매 for 문이 끝나면 찾은 요소를 tempResult라는 배열에 넣어서 result라는 배열에 다시 넣어준다.
// 5. result의 길이를 리턴해준다.
// 6. str2를 돌 때는 for j문보다는 while문으로 해서 str.length > 0 을 조건으로 넣어주는 것이 나을 것 같다.
// 7. 그렇게 해서 str2에서 처음부터 검색하고, 또 슬라이스된 배열에서 처음부터 검색하는 것이 효율적일 것 같다는 생각이 든다.

const LCS = function (str1, str2) {
  // 먼저 통일성을 위해서 둘 중 더 짧은 것을 str1으로 바꿔준다.
  if (str1.length > str2.length) {
    let temp = str1;
    str1 = str2;
    str2 = temp;
  }

  // 정답을 담을 배열을 만들어준다.
  let result = [];

  // 정답의 최대 길이는 어차피 둘 중 짧은 배열의 길이이기 때문에 i의 범위를 둘 중 더 짧은 str1.length로 제한해준다.
  for (let i = 0; i < str1.length; i++) {
    // str1의 원소의 첫번째부터 str2에 원소가 있는지 파악하는데, 존재하는 원소를 tempResult에 넣어준다.
    let tempResult = [];
    // 길이가 더 긴 배열인 str2를 복사해준다. 그 이유는 str2에 대해 한 번 겹치는 원소를 발견하면 그 다음 원소부터 검색을 시작해야하기때문에
    // 발견한 index 다음으로 slice해주며 계속 검색을 해 줄 것이기 때문이다. 또한 j문이 끝나면 다시 새롭게 str2에대한 검색을 해야하기 때문에 for i 문 안에 복사를 선언해주었다.
    let str2Copy = str2;
    // str1의 length 횟수만큼 str1[0] => str1[1] => str1[2] ... str1[str1.length -1] 까지 검색을 해줄것이기 때문에 for i 문이 새롭게 시작될 때마다 한 칸씩 slice를 해준다.
    str1 = str1.slice(i);

    // for j 반복문 또한 최댓값이 str1.length 이기 때문에 j의 범위를 str1.length로 제한해준다.
    for (let j = 0; j < str1.length; j++) {
      // 위에서 만든 str2Copy에 대해서 indexOf()함수로 str1[j] 원소가 있는지 확인한다.
      if (str2Copy.indexOf(str1[j]) != -1) {
        // 만약 존재한다면 그 원소를 tempResult에 넣어준다.
        tempResult.push(str1[j]);
        // 한 번 검색을 마쳤으면, 위에서 나온 str2Copy.indexOf(str1[j]) str1[j]원소의 최초값이기때문에, 또한 순서가 맞아야하기때문에
        // str[j+1]로 넘어가기 전에 str2Copy 배열을 일치하는 원소의 index + 1 부터 slice해준다.
        // indexOf 함수를 사용해주기때문에 이렇게 slice해주지 않으면 아래 예시처럼 str1에는 g가 연속해서 있을 때, str2에는 g가 하나밖에 없지만
        //
        str2Copy = str2Copy.slice(str2Copy.indexOf(str1[j]) + 1);
      }
    }
    // 위와같은 과정을 통해서 tempResult에 str1[i]에서부터 일치하는 원소가 담겼다. 이전 값인 result와 비교하여 둘 중 더 큰 값을 result에 넣어준다.
    if (result.length < tempResult.length) result = tempResult;
  }
  return result.length;
};

// let output = LCS("abcd", "aceb");
// console.log(output); // --> 2 ('ab' or 'ac')

output = LCS("aggtab", "gxtxayb");
console.log(output); // --> 4 ('acak')
