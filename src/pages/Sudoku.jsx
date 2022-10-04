import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Board from '../sudokuComponents/Board';


function Sudoku() {
  const [open, setOpen] = useState(true);

  return (
    <div className='sudokuPageContainer'>
      <h2>Welcome to the Sudoku Game & Solver</h2>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
        Overview
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" className='sudokuOverview'>
          In this project, I used a <strong>Backtracking Algorithm</strong> to make a sudoku game and solver.
          <br/>
          You can try to solve the game of sudoku and check it by pressing on the <em>Solve Button</em>.
          <br/>
          You can <strong>also</strong> implement a game of sudoku yourself and solve it here.
          <br/>
          First press on the <em>Clear Board Button</em> and then input the numbers you want in the grid and then press the <em> Save Board Button</em>.
          <br/>
          Then press the <em>Solve Button</em> to solve your input sudoku puzzle
        </div>
      </Collapse>

      <Board/>
    </div>
  )
}

export default Sudoku