import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Main(props) {
  // TicTacToe Game
  const [clicked,setClicked] = useState(false)
  const [player1,setplayer1] = useState({})
  const [player2,setplayer2] = useState({})
  const [playersNames,setPlayersNames] = useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:9191/Scores/getAllPlayers")
    .then((res)=>{
      setPlayersNames(res.data.map(player=>player.playerName));
    })
  },[])

  const addPlayer1 =()=>{
    axios.post('http://localhost:9191/Scores/savePlayer', 
      {
      "playerName": player1.playerName,
      wins: 0,
      losses:0
    })
  }

  const addPlayer2 =()=>{
    axios.post('http://localhost:9191/Scores/savePlayer', 
      {
      "playerName": player2.playerName,
      wins: 0,
      losses:0
    })
    }

  function handleChange1(e){
    setplayer1((x)=>{return {...x,playerName:e.target.value}})
  }

  function handleChange2(e){
    setplayer2((x)=>{return {...x,playerName:e.target.value}})
  } 

  useEffect(() => {
    localStorage.setItem('player1', player1.playerName);
    localStorage.setItem('player2', player2.playerName);
  }, [player1,player2]);

  
  function handleClickLogIn(){
    setClicked(x=>!x)  
  }
    
  function handleClickGoTo(){
    setClicked(false)

    if(playersNames.includes(player1.playerName)){
      if(playersNames.includes(player2.playerName)){
        return null
      }
      addPlayer2()
    }
    else if (playersNames.includes(player2.playerName)){
      if(playersNames.includes(player1.playerName)){
        return null
      }
      addPlayer1()
    
    }
    else{
      addPlayer1()
      addPlayer2()
    }
  
  }
  //end of TicTacToe Game
 
  return (
    <div className="HomePageDiv">
        <h1 className="HomePageTitle">Game Center</h1>
        
        <div className="mainButtons">
          <Link className='btn' onClick={handleClickLogIn}>Tic-Tac-Toe</Link> 
          <Link to='/wordle' className='btn'>Wordle</Link>
          <Link to='/battleShips' className="btn">Battle Ships</Link>
          <Link to='/slidingPuzzle' className="btn">Sliding Puzzle</Link>
          <Link to='/headHunter' className="btn">Head Hunter</Link>
        </div>
        


        {!clicked? 
          null: 
          <div>
            <h2>-- ADD PLAYERS NAMES --</h2>
            <input className="mainInput" placeholder="Player 1 name" onChange={handleChange1}/> 
            <input className="mainInput" placeholder="Player 2 name" onChange={handleChange2}/>
            <br/>
            <Link to='/scoreBoard' className="btn">Scoreboard</Link>
            {!clicked? 
            null
            : 
            (player1.playerName && player2.playerName && player2.playerName !== player1.playerName)
            &&
            <Link to='/board' className='btn' onClick={handleClickGoTo}>Go To game</Link>
            }
          </div>}
    </div>
  )
}
