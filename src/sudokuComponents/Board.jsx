import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import SudokuToolCollection from "sudokutoolcollection";
import solve, {validBoards} from "./BackTracking"

function Board() {
    
    const boardSize = [...Array(9).keys()]
    const cleanBoard = [...Array(9)].map(e => Array(9).fill(null))
    const sudokuLib = SudokuToolCollection()

    const [sudokuState, setSudokuState] = useState()
    const [initialGame, setInitialGame] = useState()
    const [newGame, setNewGame] = useState(false)
    const [countMoves, setCountMoves] = useState(0)

    useEffect(()=>{
        const makeSudoku = sudokuLib.generator.generate("insane")
        const makeGridSudoku = sudokuLib.conversions.stringToGrid(makeSudoku)
        
        setInitialGame(makeGridSudoku)
        setSudokuState(getPuzzle(makeGridSudoku))
        
        
    },[newGame])

    function getPuzzle(arr){
        for (let i = 0; i <9;i++){
            for (let j=0; j <9; j++){
                if (arr[i][j]=== "."){
                    arr[i][j] = null
                } else{
                    arr[i][j] = parseInt(arr[i][j])
                }

                
            }
        }
        return arr
    }

    const handleInput = (e,row,col) =>{
        let value = parseInt(e.target.value) || null
        let grid = structuredClone(sudokuState)
        //conditional input to allow values only between 1-9 at empty  places
        if ((value === null) || (value >= 1 && value <=9)){
            if (value){
                setCountMoves(prevstate => prevstate + 1)
            }
            grid[row][col] = value
        }
        setSudokuState(grid)
    }

    const handleNewGame = () =>{
        setNewGame(prevstate => !prevstate)
        setCountMoves(0)
    }
    
    const handleSolve = ()=>{
        let currentBoard = structuredClone(sudokuState)

        if (validBoards(currentBoard)){
            setSudokuState(solve(currentBoard))
        } else {
            alert("Not solved correctly. Try again please.")
        }
    }

    const handleClearBoard = () =>{
        setSudokuState(cleanBoard)
        setInitialGame(cleanBoard)
        setCountMoves(0)
    }
    const handleSaveBoard = () =>{
        if (validBoards(sudokuState)){
            setSudokuState(sudokuState)
            setInitialGame(sudokuState)
            setCountMoves(0)
        } else{
            alert("Unable to solve this puzzle. Please insert new puzzle")
            setSudokuState(cleanBoard)
        }
    }
    
  return (
    <>
    <h3 className='movesPos'>Moves Count: {countMoves}</h3>
    <div className='sudokuBoard'>
        {sudokuState &&
        <table className='sudokuTableBoard'>
            <tbody>
                {
                    boardSize.map((row,rIndex)=>{
                        return <tr key ={rIndex} className={(row +1)% 3 ===0 ? "rowBorderColor" : ""}>
                            {boardSize.map((col,cIndex)=>{
                            return <td key={rIndex + cIndex} className={(col +1)% 3 ===0 ? "colBorderColor" : ""}>
                                <input 
                                onChange={(e) => handleInput(e,row,col)} 
                                value={sudokuState[row][col] === null?'':sudokuState[row][col]} 
                                disabled={initialGame[row][col] !== null}
                            
                                className='sudokuTile' />
                            </td>
                            })} 
                        </tr>
                    })
                }
            </tbody>
        </table>
        } 
        <div className='btnContainer'>
            <Button onClick={handleNewGame} variant='contained' size='medium'>New Game</Button>
            <Button onClick={handleSolve} variant='contained' size='medium'>Solve</Button>
            <Button onClick={handleClearBoard} variant='contained' size='medium'>Clear Board</Button>
            <Button onClick={handleSaveBoard} variant='contained' size='medium'>Save Board</Button>
        </div>
    </div>
  </>
  )
}

export default Board

