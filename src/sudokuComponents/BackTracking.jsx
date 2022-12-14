export default function solve(InitialBoard) {
    // solves the given sudoku board
    // asssuming the given sudoku board is valid
    if (solved(InitialBoard)) {
        return InitialBoard
    }
    else {
        const possibilities = nextBoards(InitialBoard)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}


function searchForSolution(boards){
    // finds a valid solution to the sudoku problem
    if (boards.length < 1){
        return false
    }
    else {
        // backtracking search for solution
        let first = boards.shift()
        const tryPath = solve(first)
        if (tryPath !== false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


function solved(board){
    // checks to see if the given puzzle is solved
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] === null){
                return false
            }
        }
    }
    return true
}


function nextBoards(board){ 
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    let res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty !== undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (let i = 1; i <= 9; i++){
            let newBoard = [...board]
            let row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board){
    // (get the i j coordinates for the first empty square)
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] === null) {
                return [i, j]
            }
        }
    }
}


function keepOnlyValid(boards){
    // filters out all of the invalid boards from the list
    let res = []
    for (let i = 0; i < boards.length; i++){
        if (validBoards(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

export function validBoards(board){
    // checks to see if given board is valid
    return rowsCheck(board) && columnsCheck(board) && GridCheck(board)
}

function rowsCheck(board){
    // Check for no repeating numbers for each row
    for (let i = 0; i < 9; i++){
        let curr = []
        for (let j = 0; j < 9; j++){
            if (curr.includes(board[i][j])){
                return false
            }
            else if (board[i][j] !== null){
                curr.push(board[i][j])
            }
        }
    }
    return true
}

function columnsCheck(board){
    // makes sure there are no repeating numbers for each column
    for (let i = 0; i < 9; i++){
        let curr = []
        for (let j = 0; j < 9; j++){
            if (curr.includes(board[j][i])){
                return false
            }
            else if (board[j][i] !== null){
                curr.push(board[j][i])
            }
        }
    }
    return true
}


function GridCheck(board){
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    // check no repeating numbers for each box
    for (let y = 0; y < 9; y += 3){
        for (let x = 0; x < 9; x += 3){
            // each traversal examines each box
            let curr = []
            for (let i = 0; i < 9; i++){
                let coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (curr.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] !== null){
                    curr.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}
