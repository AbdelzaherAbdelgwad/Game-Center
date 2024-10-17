import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

export default function HeadHunterScoreBoard() {
  const [allPlayers,setAllPlayers] = useState([])

  const removePlayer = (id)=>{
    axios.delete('http://localhost:9191/playerInfo/deletePlayerById + ' + id)
  }
  
  useEffect(()=>{
    axios.get("http://localhost:9191/playerInfo/getAllPlayers").then((res)=>{setAllPlayers(res.data);console.log(res.data)})
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
    axios.delete("http://localhost:9191/playerInfo/deleteAllPlayers")
    alert("All Players are deleted")
    setAllPlayers([])
    return <h1>NO Players found</h1>
    

  }

  return (
    <div className='HeadHunterScoresDiv'>
        <h1 className='HomePageTitle'>SCORE BOARD</h1>
        <em>~ Note:  This show your best attempt of all time ~</em>        
        {allPlayers[0] 
            && 
        <table> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Hits</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {allPlayers.map((player,index)=>{
            return  <tr key={index}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                        <td>{player.accuracy}%</td>
                    </tr>})}
          </tbody>
          
        </table>}       
        {allPlayers[0] ? <Link onClick={handleDeleteAll} className="btn" reloadDocument>Reset</Link>: <h1>No Players found</h1>}
        <Link to='/' className="btn">Home Page</Link>
        <Link reloadDocument className="btn">New Game</Link> 

          
        <br/>
        {/* {!allPlayers[0]? <h2>There is no players in game yet</h2>:<Link to='/board' className="btn">Tic-Tac-Toe game</Link>} */}

        

    
    </div>
  )
}
