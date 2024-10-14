import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Main() {
  const userName = localStorage.getItem("Username")
  const [ticClicked,setTicClicked] = useState(false)
  // tictactoePlayer
  const [player1Tictactoe,setPlayer1Tictactoe] = useState({})
  const [player2Tictactoe,setPlayer2Tictactoe] = useState({})
  const [playersNames,setPlayersNames] = useState([])
    // end of tictactoePlayer
  const [headHunterclicked,setHeadHunterClicked] = useState(false)
  const [headHunterPlayer,setHeadHunterPlayer] = useState({})
  const [headHunterPlayers,setHeadHunterPlayers] = useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:9191/Scores/getAllPlayers")
    .then((res)=>{
      setPlayersNames(res.data.map(player=>player.playerName));
    })
    axios.get('http://localhost:9191/playerInfo/getAllPlayers')
    .then((res)=>{setHeadHunterPlayers(res.data.map(player=>player.name))})
    localStorage.setItem("auth",false)
    localStorage.setItem("authTicTacToe",false)

  },[])
  // TicTacToe Game
  const addPlayer1Tictactoe =()=>{
    axios.post('http://localhost:9191/Scores/savePlayer', 
      {
      'playerName': player1Tictactoe.playerName,
      wins: 0,
      losses:0
    })
  }

  const addPlayer2Tictactoe =()=>{
    axios.post('http://localhost:9191/Scores/savePlayer', 
      {
      'playerName': player2Tictactoe.playerName,
      wins: 0,
      losses:0
    })
    }

  function handleChange1(e){
    setPlayer1Tictactoe((x)=>{return {...x,playerName:e.target.value}})
  }

  function handleChange2(e){
    setPlayer2Tictactoe((x)=>{return {...x,playerName:e.target.value}})
  } 

  useEffect(() => {
    localStorage.setItem('player1', player1Tictactoe.playerName);
    localStorage.setItem('player2', player2Tictactoe.playerName);
    localStorage.setItem('headHunterPlayer', headHunterPlayer.name);
  }, [player1Tictactoe,player2Tictactoe,headHunterPlayer]);

  
  function handleClickLogIn(){
    setHeadHunterClicked(false)
    setTicClicked(x=>!x)  
  }
    
  function handleClickGoTo(){
    localStorage.setItem('authTicTacToe',true)
    setTicClicked(false)

    if(playersNames.includes(player1Tictactoe.playerName)){
      if(playersNames.includes(player2Tictactoe.playerName)){
        return null
      }
      addPlayer2Tictactoe()
    }
    else if (playersNames.includes(player2Tictactoe.playerName)){
      if(playersNames.includes(player1Tictactoe.playerName)){
        return null
      }
      addPlayer1Tictactoe()
    
    }
    else{
      addPlayer1Tictactoe()
      addPlayer2Tictactoe()
    }
  
  }
  //end of TicTacToe Game
  // HeadHunter
    function handleClickUser(){
      setHeadHunterClicked(prev=>!prev)
      setTicClicked(false)
    }
    function addHeadHunterPlayer(){
      axios.post('http://localhost:9191/playerInfo/addPlayer', 
        {
        name: headHunterPlayer.name,
        score: 0,
        accuracy:0
      })
    }
    function handleHeadHunterChange(e){
        setHeadHunterPlayer((x)=>{return {name:e.target.value}})
    }
    function handleClickStartHeadHunter(){
      localStorage.setItem("auth",true)
      if(headHunterPlayers.includes(headHunterPlayer.name)){
        console.log("exist player")
        return null
      }else{
        addHeadHunterPlayer()
      }
    }
  // end of HeadHunter
  function handleLogout(){
    localStorage.setItem('Login','false')
  }
  return (
    <div className="HomePageDiv">
        <h1 className="HomePageTitle">- GAME CENTER -</h1>
        {userName?<h2>Welcome {userName}</h2>:null}
        <div className="mainButtons">
          <Link className='btn' onClick={handleClickLogIn}>Tic-Tac-Toe</Link> 
          <Link to='/wordle' className='btn'>Wordle</Link>
          <Link to='/battleShips' className="btn">Battle Ships</Link>
          <Link to='/slidingPuzzle' className="btn">Sliding Puzzle</Link>
          <Link className="btn" onClick={handleClickUser}>Head Hunter</Link>
          <Link className="btn" to='/sudoku'>Sudoku</Link>
          <Link className="btn" to='/sixteenPuzzle'>sixteen Puzzle</Link>
        </div>
        <Link className="btn" to='/login' style={{backgroundColor:'red'}} onClick={handleLogout}>Logout</Link>


        {!ticClicked? 
          null: 
          <div>
            <h2>-- ADD PLAYERS NAMES --</h2>
            <input className="mainInput" placeholder="Player 1 name" onChange={handleChange1}/> 
            <input className="mainInput" placeholder="Player 2 name" onChange={handleChange2}/>
            <Link to='/scoreBoard' className="btn">Scoreboard</Link>
            {!ticClicked? 
            null
            : 
            (player1Tictactoe.playerName && player2Tictactoe.playerName && player2Tictactoe.playerName !== player1Tictactoe.playerName)
            &&
            <Link to='/ticTacToe' className='btn' onClick={handleClickGoTo} reloadDocument >Start the game</Link>
            }
          </div>}
          {headHunterclicked?
            <div>
              <h2>-- ADD YOUR NAME --</h2>
              <input className="mainInput" placeholder="Player name" onChange={handleHeadHunterChange}/>
              {headHunterPlayer.name ?<Link to='/headHunter' className="btn" onClick={handleClickStartHeadHunter} reloadDocument>Start the game</Link>:null}
            </div>
            :
            null

          }
          <footer> - Crafted with love, by Abdelzaher Abdelgwad -</footer>

    </div>
  )
}
