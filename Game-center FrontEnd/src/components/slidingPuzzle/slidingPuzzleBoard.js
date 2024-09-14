import React, { useEffect } from 'react'
import { useState } from 'react'
import Square from './square'
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';


export default function SlidingPuzzleBoard() {
    const [boardSquares,setBoardSquares] = useState(Array(16).fill(null))
    const [boardValues,setBoardValues] = useState(Array(16).fill(null))
    const [randomValue] = useState(Math.round(Math.random()*15))
    const [win,setWin] = useState(false)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    useEffect(()=>{
        let y = true
        setBoardValues(prev => prev.map((value, index) =>{
            if(index === randomValue){
                value = null
                y = false
            }else{
                 value = y?index +1 : index
            }
           return value;
        } ));
        setBoardValues(prev=>shuffleArray(prev))

    },[randomValue])

    // (Math.min(index,getIndex)+1) %4 === 0
    function moveSquare(index){
        let getIndex  = boardValues.indexOf(null)
        let canMove = false;
        // to make sure that can't move from one row to the other (not neighbor)
        let goodNeighbor = (Math.min(index,getIndex)+1) %4 !== 0
        if(goodNeighbor & (index === getIndex +1)||goodNeighbor &(index === getIndex-1) || index === getIndex+4||index === getIndex-4){
            canMove = true; 
        }
        canMove && setBoardValues(prev=>{
            let newValues = [...prev]
            newValues[getIndex] = prev[index] 
            newValues[index] = null
            setWin(calculateWinner(newValues))
            return newValues
        })
        
        
    }
    function arraysEqual(arr1, arr2) {
        arr2 = arr2.slice(0, arr1.length);
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    
        return true;
    }
    function calculateWinner(arr){
        let x = Array.from({ length: 15 }, (_, index) => index + 1);
        if(arraysEqual(x,arr)){
            return true
        }
        return false
    }
  return (
    <div>
        <h1>Sliding puzzle</h1>
        {win && <h1> You cracked the puzzle! 🎉</h1>}
        <div className="SlidingPuzzleBoard">
            {boardSquares.map((value, index) => {
                return (
                    <Square key={index} value={boardValues[index]} onSquareClick={win? null :()=>moveSquare(index)} ></Square>
                )
            })}
            
        </div>
        {win && <Link reloadDocument to='/slidingPuzzle' className="btn">New Game</Link>}
        <Link to='/' className="btn">Home Page</Link>
        {win && <Confetti />}

    </div>
    
   
  )
}
