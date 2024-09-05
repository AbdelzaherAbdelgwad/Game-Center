import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

export default function ScoreBoard() {
  const [allPlayers,setAllPlayers] = useState([])

  const removePlayer = (id)=>{
    axios.delete('http://localhost:9191/Scores/deleteById + ' + id)
  }
  
  useEffect(()=>{
    axios.get("http://localhost:9191/Scores/getAllPlayers").then((res)=>{setAllPlayers(res.data)})
  }
  ,[])

  function handleDelete(player){
    if(player.playerName === localStorage.getItem('player1') || player.playerName === localStorage.getItem('player2') ){
      alert("can't remove current players")

    }
    else{
      removePlayer(player.id)
      window.location.reload();
    }
    

  }

  function handleDeleteAll(){
    axios.delete("http://localhost:9191/Scores/deleteAll")
    window.location.reload();
    alert("All Players are deleted")


  }

  return (
    <div className='HomePageDiv'>
        <h1 className='HomePageTitle'>Scoreboard</h1>
        {allPlayers[0] 
        && 
        allPlayers.map((player,index)=>
        {return <ul key={index}>
                  <li>
                    <h3>{player.playerName}: ({player.wins}) wins |||| ({player.losses}) losses <button onClick={()=>handleDelete(player)}>Delete</button></h3>
                    
                  </li>
                </ul>})}

        <Link to='/' className="btn">Home Page</Link> 
        {allPlayers[0] && <Link onClick={handleDeleteAll} className="btn">Reset</Link>}
        <br/>
        {!allPlayers[0]? <h2>There is no players in game yet</h2>:<Link to='/board' className="btn">Tic-Tac-Toe game</Link>}

        

    
    </div>
  )
}
