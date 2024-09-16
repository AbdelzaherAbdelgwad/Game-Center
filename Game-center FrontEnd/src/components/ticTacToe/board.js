import Square from "./square";
import React, { useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import Confetti from 'react-confetti';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Board() {
// constants
  const [boardSquares,setBoardSquares] = useState(Array(9).fill(null))
  const [draw,setDraw] = useState("")
  const [newGame,setNewGame]= useState(false)
  const [isX,setIsX] = useState(true)
  const [player1,setplayer1] = useState(localStorage.getItem('player1'))
  const [player2,setplayer2] = useState(localStorage.getItem('player2'))
  const [player1Wins,setPlayer1Wins] = useState()
  const [player2Wins,setPlayer2Wins] = useState()
  const [player1Losses,setPlayer1Losses] = useState()
  const [player2Losses,setPlayer2Losses] = useState()
  
//  get request wins
  useEffect(()=>{
    if(player1){
      axios.get("http://localhost:9191/Scores/getPlayer + " + player1)
      .then((res)=>{
        setPlayer1Wins(res.data.wins)
        setPlayer1Losses(res.data.losses)})   
    }
    
    if(player2){
      axios.get("http://localhost:9191/Scores/getPlayer + " + player2)
      .then((res)=>{
        setPlayer2Wins(res.data.wins)
        setPlayer2Losses(res.data.losses)})
    }
    
  },[player1,player2])
  
  // update winner
  const updateScoreboard= ()=>{
    console.log("update score called")
    if(isX){
      
      axios.post('http://localhost:9191/Scores/updateScore',{
        "playerName": player1,
        wins: player1Wins+1,
        losses:player1Losses
      }).then(res => {setPlayer1Wins(res.data.wins)})

      axios.post('http://localhost:9191/Scores/updateScore',{
        "playerName": player2,
        wins: player2Wins,
        losses:player2Losses + 1
      }).then(res => {setPlayer2Losses(res.data.wins)})

      
    }else{
      axios.post('http://localhost:9191/Scores/updateScore',{
        "playerName": player2,
        wins: player2Wins + 1,
        losses:player2Losses
      }).then(res => {setPlayer2Wins(res.data.wins)})

      axios.post('http://localhost:9191/Scores/updateScore',{
          "playerName": player1,
          wins: player1Wins,
          losses:player1Losses +1
        }).then(res => {setPlayer1Losses(res.data.wins)})
      
      
    }
  }



// handleSquareCLick
  function handleSquareClick(i) {
    const updatedBoardSquares = [...boardSquares]; 
    
    if (!calculateWinner(updatedBoardSquares) &&!boardSquares[i]) {
      if (isX) {
        updatedBoardSquares[i] = 'X'
        setIsX(x => !x)
      } else {
        updatedBoardSquares[i] = 'O'
        setIsX(x => !x)
      }
    }
    if(calculateWinner(updatedBoardSquares)){
      updateScoreboard();
    }
    
    
    setBoardSquares(updatedBoardSquares);
    if(!updatedBoardSquares.includes(null)){
        if(!calculateWinner(updatedBoardSquares))
        setDraw("Draw")
    }    
  }
// end of handleSquareCLick

  function clearBoard(){
    const board = Array(9).fill(null)
    setDraw("")
    setNewGame(x=>!x)
    setBoardSquares(board);
    setIsX(x=>!x)
  }
  const calculateWinner = (squares)=>{
    const lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                    [0, 3, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
        return squares[a]
      }   
    } 
  return null  }
 
return (
  <div>

      {player1 && player2 && <h3>{player1} vs {player2}</h3> }
      {!calculateWinner(boardSquares) &&<h2>Next Player: {isX? player1+ " (X)" :player2+ " (O)"}</h2>}
      
      <div className="Board">

    {boardSquares.map((value, index) => {

      return (
        <Square key={uuidv4()} onSquareClick={calculateWinner(boardSquares)? null:() => handleSquareClick(index)} value={value} ></Square>
      )
    })}
    
  </div>
  <Link className="btn" onClick={clearBoard}>New Game</Link>
  <br/>
  <Link to='/' className="btn">Home Page</Link>
  <Link to='/scoreBoard' className="btn">Scoreboard</Link>

  {calculateWinner(boardSquares)? <Confetti/>:null}
  {calculateWinner(boardSquares)? <h1>winner is : {calculateWinner(boardSquares)==="X"? player1+" (X)":player2+" (O)"}</h1>:null}
  {draw? <h1>Draw</h1>:null}
  </div>
  
)
}