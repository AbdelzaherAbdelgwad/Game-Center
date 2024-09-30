import React, { useEffect, useState } from 'react'
import SudokuSquare from './sudokuSquare'
import Clues from './clues'
import winCheck from './winCheck'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti';
export default function SudokuBoard() {
    const [board,setBoard] = useState(Array(81).fill(null))
    const [render,setRender] = useState(false)
    const [boardValues,setBoardValues] = useState(Array(81).fill(null))
    const [cluesPositions, cluesValues] = Clues(25)
    const [winner,setWinner] = useState(false)
    const [startingClues,setStartingClues] = useState(Array(81).fill(null))

    useEffect(() => {
      const updateBoardValues = async () => {
          setBoardValues((prev) => {
              let newValues = [...prev];
              newValues.forEach((value, index) => {
                  if (cluesPositions.includes(index)) {
                      const clueIndex = cluesPositions.indexOf(index);
                      newValues[index] = cluesValues[clueIndex]; 
                  }
              });
              console.log(newValues)
              setStartingClues(newValues)
              return newValues; 
          });
          setRender(true)
      };
      updateBoardValues();
  }, []);
  // check winner
  useEffect(()=>{
   if (winCheck(boardValues).length === 27){
     setWinner(true)
   }
  },[boardValues])
  
  function handelChange(e,index){
    setBoardValues((prev) => {
      let newValues = [...prev];
      newValues[index] = parseInt(e.target.value) || null
      // console.log(newValues)
      return newValues
    })
  } 
    
  return (
    <div>
        <h1>Sudoku</h1>
        {winner?<h1>you won</h1>:null}
        <div className='sudokuBoard'>
            
            {board.map((value,index)=>{
                    return <SudokuSquare
                            key = {index}
                            value ={boardValues[index] || '' }
                            onChange={(e)=>handelChange(e,index)}
                            disabled ={startingClues[index]}   
                /> 
               
             
            })}
        </div>
        <Link reloadDocument to='/sudoku' className="btn">New Game</Link>
        <Link to='/' className="btn">Home Page</Link>
        {winner? <><Confetti/> <h2>Congratulation you got the right answer</h2></>:null}
    </div>
    
  )
}
