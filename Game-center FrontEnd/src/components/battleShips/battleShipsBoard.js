/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
/* eslint-disable no-loop-func */
import React, { useEffect, useState,useRef} from 'react'
import Square from './BoardSquare'
import { Link } from "react-router-dom";
import PlaceShips from './placeShips';
import CalculateWinner from './calculateWinner';

export default function BattleShipsBoard() {
    
    const [playerOneStyles,setPlayerOneStyles]=useState(Array(100).fill({}))
    const [playerTwoStyles,setPlayerTwoStyles]=useState(Array(100).fill({}))
    const [playerOneTurn,setPlayerOneTurn]=useState(true)
    const colors = ['aqua','blue','red','green','yellow']
    const [firstPlayerShipsLocation, setFirstPlayerShipsLocation] = useState([]);
    const [secondPlayerShipsLocation, setSecondPlayerShipsLocation] = useState([]);
    const [winner, setWinner] = useState(0);
    const [randomWeight, setRandomWeight] = useState(1);
    const ships=[5,4,3,3,2]
    const board=Array(100).fill(null)
    const [allSquaresPlayerOne,setAllSquaresPlayerOne]=useState(Array.from({ length: 100 }, (_, index) => index))
    const [allSquaresPlayerTwo,setAllSquaresPlayerTwo]=useState(Array.from({ length: 100 }, (_, index) => index))

    const playerOneRef = useRef(null);

    let styles =[]
  // placement of ships at the beginning 
 
  useEffect(()=>{
    const locationOne= PlaceShips(ships, setPlayerOneStyles, colors)
    const locationTwo= PlaceShips(ships, setPlayerTwoStyles, colors)
    setFirstPlayerShipsLocation(locationOne);
    setSecondPlayerShipsLocation(locationTwo);
    console.log(locationOne)
  },[])
   
  function handlePlayerOneClick(e,index){

    if(winner !== 0 || e.target.style.backgroundColor === "white" || colors.includes(e.target.style.backgroundColor)){
      return null
    }
    if(playerOneTurn){
      if(secondPlayerShipsLocation.includes(index)){
        setAllSquaresPlayerTwo(prev=>{
          const newSquares = prev.filter(e => e !== index)
          if(CalculateWinner(newSquares,secondPlayerShipsLocation)){
            setWinner(1)
         }
          return newSquares
        })
      
        e.target.style.borderRadius= playerTwoStyles[index].borderRadius
        e.target.style.backgroundColor= playerTwoStyles[index].backgroundColor
        return null
      }else{
        e.target.style.backgroundColor="white"
  
      }
    }
    
    // computer's turn (^-^)
    const randomSquareIndex= Math.floor(Math.random()*(allSquaresPlayerOne.length))
    let randomSquare= allSquaresPlayerOne[randomSquareIndex]

// ensuring that enemy is not choosing a random square if he picked a correct ship location, by choosing a nearby square.
// not optimal.
    if(firstPlayerShipsLocation.includes(parseInt(localStorage.getItem('prevSquare')))){
      
      switch(randomWeight) {
        case 1:
            randomSquare = parseInt(localStorage.getItem('prevSquare')) + 1;
            break;
        case 2:
            randomSquare = parseInt(localStorage.getItem('prevSquare')) - 1;
            break;
        case 3:
            randomSquare = parseInt(localStorage.getItem('prevSquare')) - 10;
            break;
        case 4:
            randomSquare = parseInt(localStorage.getItem('prevSquare')) + 10;
            break;
      }
      console.log(localStorage.getItem('prevSquare')+" local")
      console.log(randomSquare + " after")
      if(!firstPlayerShipsLocation.includes(randomSquare)){
        setRandomWeight(r=>{
          console.log(r + " weight")
          if(r===4){
            return 1
          }
          return r+1
        })
        }else{
          localStorage.setItem('prevSquare',randomSquare.toString())
        }
        if(!allSquaresPlayerOne.includes(randomSquare)){
          randomSquare= allSquaresPlayerOne[randomSquareIndex]
        }  
    }
    //-------------------------------
    setPlayerOneStyles(prev=>{
      const newStyle = [...prev];
      console.log(randomSquare + " styles")
      if(firstPlayerShipsLocation.includes(randomSquare)){
        newStyle[randomSquare] ={ backgroundColor: "black" ,borderRadius: '25%' }
        localStorage.setItem('prevSquare',randomSquare.toString())
        setPlayerOneTurn(false)
      }else{
        newStyle[randomSquare] = { backgroundColor: "white" }
        setPlayerOneTurn(true)

      }

      return newStyle
    })
    setAllSquaresPlayerOne(prev=>{
      const newSquares = prev.filter(e => e !== randomSquare);
      if(CalculateWinner(newSquares,firstPlayerShipsLocation)){
        setWinner(2)
     }
      return newSquares
    })
    
  }

  return (
    <div className='HomePageDiv'>
      <h1 className='HomePageTitle'>BattleShips</h1>
      <div className='BattleShipContainer'>
        <div>
          <h1>Player's Ships</h1>
          <div className='BattleShipBoard' id='playerTwo'>
            { board.map((value,index)=>{
                return  <Square
                            key={index}
                            style={playerOneStyles[index]}
                            value={value}
                            refs={playerOneRef}
                        />
            })}
          </div>
        </div>

        <div>
          <h1>Enemy's Ships</h1>
          <div className='BattleShipBoard' id='playerTwo'>
            {board.map((value,index)=>{
                return  <Square
                            key={index}
                            onSquareClick={(e)=>playerOneTurn && handlePlayerOneClick(e,index)}
                            style={styles[index]}
                            value={value}
                        />
            })}
          </div>
          
        </div>
        
      </div>
      {!playerOneTurn && winner === 0 && <button onClick={handlePlayerOneClick}><h1>computer's turn</h1></button>}
      <br />
      {winner === 1 && <h1>Player 1 wins</h1>}
      {winner === 2 && <h1>Player 2 wins</h1>}
      
      <Link reloadDocument to='/battleShips' className="btn">New Game</Link>
      <Link to='/' className="btn">Home Page</Link>

    </div>
   
  )
}



