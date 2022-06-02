// 1. for i, for j 문으로 모든 요소를 돌면서 현재 요소가 1일 때 상/하/좌/우에 1이 있는지 본다.
// 2. 그 요소를 포함하여 상/하/좌/우 에 있는 1인 요소를 재귀방식으로 모두 false로 바꿔준 후 cnt를 1 올려준다.

const countIslands = (grid) => {
  let cnt = 0;

  // 상/하/좌/우에 1이 있는지 확인하고 1이 있다면 true로 바꿔주는 함수
  // 상/하/좌/우에 1이 있다면 true 로 바꿔준 후, 바꿔준 요소를 중심으로 다시 상/하/좌/우에 1이 있는지 확인하며 연속된 모든 1을 재귀적으로 true로 치환해준다.
  const isIsland = (i, j) => {
    // up
    if (i !== 0 && grid[i - 1][j] === "1") {
      grid[i - 1][j] = true;
      isIsland(i - 1, j);
    }
    // right
    if (j !== grid[0].length - 1 && grid[i][j + 1] === "1") {
      grid[i][j + 1] = true;
      isIsland(i, j + 1);
    }
    // down
    if (i !== grid.length - 1 && grid[i + 1][j] === "1") {
      grid[i + 1][j] = true;
      isIsland(i + 1, j);
    }
    // left
    if (j !== 0 && grid[i][j - 1] === "1") {
      grid[i][j - 1] = true;
      isIsland(i, j - 1);
    }
  };

  // for문을 두 개 겹쳐 모든 요소를 살펴준다,
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // 1이 발견되면 위에서 생성한 함수에 1의 좌표를 넣어 실행시켜준다.
      // 그렇게되면 연속된 모든 요소가 ture로 바뀌기 때문에 이어지는 search에서 1이 아니므로 다시 계산될 일이 없다.
      if (grid[i][j] === "1") {
        grid[i][j] = true;
        cnt++;
        isIsland(i, j);
        console.log(grid);
      }
    }
  }
  return cnt;
};

// let grid = [
//   ["0", "1", "1", "1"],
//   ["0", "1", "1", "1"],
//   ["1", "1", "0", "0"],
// ];
// let result = countIslands(grid);
// console.log(result); // --> 1

grid = [
  ["0", "1", "1", "1", "0"],
  ["0", "1", "0", "0", "0"],
  ["0", "0", "0", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "1", "0"],
];

grid = [
  ["0", "1", "0", "1", "0", "1"],
  ["1", "0", "1", "0", "1", "0"],
  ["0", "1", "0", "1", "0", "1"],
  ["1", "0", "1", "0", "1", "0"],
  ["0", "1", "0", "1", "0", "1"],
];
result = countIslands(grid);
console.log(result); // --> 3

// notion : https://www.notion.so/test_41-countIslands-1997ac58af3744dbb2e58e36ebc5f2f3
