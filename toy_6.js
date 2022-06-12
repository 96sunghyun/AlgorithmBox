const sudoku = function (board) {

    //비어있는 칸(0)의 좌표를 알려주는 함수
    const findZero = function(board){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] === 0) return [i, j]
            }
        }
        return [-1, -1]  //비어있는 칸이 없을 때 리턴하는 값
    }

    //findzero 함수를 통해 얻은 좌표로 같은 행과 열, square 내에 겹치는 숫자가 있는지 확인하는 함수
    const isPossible = function(row, col, board, num){
        for(let i = 0; i < board.length; i ++){
            if(board[row][i] === num) return false
            if(board[i][col] === num) return false
        }
        let sectionRow = Math.floor(row/3)*3
        let sectionCol = Math.floor(col/3)*3
        for (let i = sectionRow; i < sectionRow+3; i++){
            for (let j = sectionCol; j < sectionCol+3; j++){
                if(board[i][j] === num) return false
            }
        }
        return true;
    }

    //이제 위에 있는 함수들을 이용해 문제를 풀어나가보자
    let zero = findZero(board) // 사용하기 편하게 변수선언
    let row = zero[0], col = zero[1] // zero는 0인 자리의 좌표를 나타내기때문에 zero[0]은 0의 세로자리값, zero[1]은 0의 가로자리값을 나타낸다.
    if(row === -1) return board // 만약 0인 자리가 없다면(zero === [-1, -1] 이라면), 이는 모든 조건을 충족하는 답이라는 말이기 때문에 그대로 답을 반환한다.)

    for(let num = 1; num < 10; num++){ // 이제 1부터 9까지의 숫자를 위에서 얻어낸 0의 자리에 넣는다.
        if(isPossible(row, col, board, num) === false) continue; // 만약 isPossible함수의 조건에 맞지 않는다면(가로나 세로, square에 num과 같은 값이 있다면) 다음 숫자로 넘어감
        board[row][col] = num; // isPossible함수를 통과했다는 건 가로, 세로, square에 같은 값이 없다는 것이기때문에 해당 좌표에 0 대신 현재 순서의 num을 넣어준다.
        if(sudoku(board) != -1) return sudoku(board) // 만약 위 과정을 통해 수정한 board가 -1이 아니라면(아직 다 안채워졌거나 채우는 과정에서 더 채울수 없게 된다면)
        // sudoku함수에 수정한 board를 대입해서 답이 나올때까지 재귀한다.
        board[row][col] = 0; // 답이 아닌 경우 board[row][col]에 다른 숫자를 넣고 다시 for 문이 작동할 수 있게 0으로 초기화해준다.
    }
    return -1
    /* 여기서 -1을 넣고 위에서 값이 -1이 아닐경우 다시 재귀하는 이유
    결과적으로 바로 위 (34줄)부터가 답을 추출해내는 과정이다. 이 때 1부터 시작해서 9까지의 숫자를 넣는데
    1. 만약 위 for문에서 처음으로 1이라는 숫자를 넣은 것 만으로 스도쿠가 완성이 되었다면, sudoku(board)의 값은 32줄에서 걸리기때문에 바로 정답으로 return이 될 것이다.
    2. 1을 넣은 후 아직 완성이 되지 않았다면, 재귀시에 32번째 줄에 걸리지 않을 것이고, 다음 0번 라인에 1을 넣고자하나, isPossible에서 false가 나오기때문에 continue를 진행해서
    만약 2가 가능하다면 2가 들어가게 될 것이다.
    3. 그런데 만약 이후 스도쿠의 정답 기준에 의해서 숫자를 대입할 수 없게 된다면? 그 땐 재귀된 함수 내에서 35번째 줄에 있는 continue에 계속 걸리게되어
    결국 board[row][col]에 0을 다시 집어넣고 -1을 리턴하게 된다.
    4. 그런데 이 때 재귀이전 첫번째 함수는 어떻게될까? 재귀함수 내에서 한 번 -1을 return하기 시작하면 연쇄적으로 최상위에 있는 첫번째 함수의 결괏값까지 -1이 적용될것이고
    처음 for문에서는 결국 board 내 첫번째 0에 1이 아닌 2를 적용한 채로 다시 함수를 진행하게 될 것이다.
    5. 그렇게되면 첫번째 0에는 2가 적용이되고 조건에 맞기 때문에 재귀함수 내에서 두 번째 0에 1이 들어가게 되겠지.
    6. 이러한 진행의 반복인 것 같다.*/
  };