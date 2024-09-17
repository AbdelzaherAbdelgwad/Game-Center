import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Main(props) {

  const [ticClicked,setTicClicked] = useState(false)
  const [player1,setplayer1] = useState({})
  const [player2,setplayer2] = useState({})
  const [playersNames,setPlayersNames] = useState([])

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
  },[])
  // TicTacToe Game
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
    localStorage.setItem('headHunterPlayer', headHunterPlayer.name);
  }, [player1,player2,headHunterPlayer]);

  
  function handleClickLogIn(){
    setHeadHunterClicked(false)
    setTicClicked(x=>!x)  
  }
    
  function handleClickGoTo(){
    setTicClicked(false)

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
      if(headHunterPlayers.includes(headHunterPlayer.name)){
        console.log("exist player")
        return null
      }else{
        addHeadHunterPlayer()
      }
    }
  // end of HeadHunter
  return (
    <div className="HomePageDiv">
        <h1 className="HomePageTitle">Game Center</h1>
        
        <div className="mainButtons">
          <Link className='btn' onClick={handleClickLogIn}>Tic-Tac-Toe</Link> 
          <Link to='/wordle' className='btn'>Wordle</Link>
          <Link to='/battleShips' className="btn">Battle Ships</Link>
          <Link to='/slidingPuzzle' className="btn">Sliding Puzzle</Link>
          <Link className="btn" onClick={handleClickUser}>Head Hunter</Link>
        </div>
        


        {!ticClicked? 
          null: 
          <div>
            <h2>-- ADD PLAYERS NAMES --</h2>
            <input className="mainInput" placeholder="Player 1 name" onChange={handleChange1}/> 
            <input className="mainInput" placeholder="Player 2 name" onChange={handleChange2}/>
            <br/>
            <Link to='/scoreBoard' className="btn">Scoreboard</Link>
            {!ticClicked? 
            null
            : 
            (player1.playerName && player2.playerName && player2.playerName !== player1.playerName)
            &&
            <Link to='/board' className='btn' onClick={handleClickGoTo}>Start the game</Link>
            }
          </div>}
          {headHunterclicked?
            <div>
              <h2>-- ADD YOUR NAME --</h2>
              <input className="mainInput" placeholder="Player name" onChange={handleHeadHunterChange}/>
              {headHunterPlayer.name ?<Link to='/headHunter' className="btn" onClick={handleClickStartHeadHunter}>Start the game</Link>:null}
            </div>
            :
            null

          }
          
    </div>
  )
}
