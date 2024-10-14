import React, { useCallback, useEffect, useState } from 'react'
import SixteenPuzzleSquare from './sixteenPuzzleSquare'
import handleSliding from './handleSliding';
import { Link } from 'react-router-dom';

export default function SixteenPuzzleBoard() {
    const [board,setBoard] = useState(Array(36).fill(null))
    const [boardValues, setBoardValues] = useState(Array.from({ length: 16 }, (_, index) => index + 1));
    const [winner,setWinner] = useState(false)

    let valueIndex = 0;

    const shuffleArray = (array)=>{
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
            return array;
    }

    useEffect( ()=>{
        const shuffled = shuffleArray([...boardValues]); 
        setBoardValues(shuffled);
    },[])   

    const createArrow =(str,index)=>{
                 return (
                     <div 
                        className={'arrow arrow'+str} 
                        key={index} 
                        onClick={()=>handleArrowClick(index)}
                        >
                        </div>
                 )
    }
    
    function handleArrowClick(index) {
        if(!winner){
            handleSliding(setBoardValues, index);
            console.log(winner)
        }
        // to access the latest values.
        setBoardValues((prevBoardValues) => {
            if(checkWinner(prevBoardValues)){
                setWinner(true)
            }
            return prevBoardValues;
        });
    }
    

    const createBoard =(value)=>{
       return (
            board.map((_,index)=>{
                if(index<6){
                    if(index === 0 || index === 5){
                        return <div key={index}></div>
                    }
                    else{
                        return createArrow("Top",index)
                    }
                }
                else if(index%6 === 0){
                    if(index < 30){
                        return createArrow("Left",index)
                    }else{
                        return <div key={index}></div>
                    } 
                }
                else if((index+1)%6 === 0){
                    if(index < 30){
                        return createArrow("Right",index)
                    }else{
                        return <div key={index}></div>
                    }
                }
                else if(index >30){
                    if(index === 36){
                        return <div key={index}></div>
                    }else{
                        return createArrow("Bottom",index)
                    }  
                }
                else{
                    return (
                        <SixteenPuzzleSquare 
                            key ={index}
                            value={value[valueIndex++]}
                        />
                    )
                }
        })
        )
    }
     function checkWinner(arr2) {

        const arrangedValues = Array.from( {length:16},(_,index) => index+1 )
        console.log(arr2)
        arr2 = arr2.slice(0, arrangedValues.length);
        for (let i = 0; i < arrangedValues.length; i++) {
            if (arrangedValues[i] !== arr2[i]) {
                return false;
            }
        }
    
        return true;
    }
    
  return ( 
  <div>
        <br/>
        <h1>Torus `Sixteen` Puzzle</h1>
        {winner?<h2>You cracked the puzzle! 🎉</h2>:null}
        <div className='sixteenPuzzleContainer'>
            {createBoard(boardValues)}
        </div>
        <Link to='/home' className="btn">Home Page</Link>
        <Link reloadDocument className="btn">New Game</Link>
    </div>
    
  )
}
