import React, { useEffect } from 'react'
import Ball from './ball'
import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import HeadHunterScoreBoard from './scoreBoard';
export default function HeadHunter() {   
    const [styling,setStyling] = useState({
            border: '1px solid gray',
            caretColor: 'transparent',
            backgroundColor: '#ffaeae',
            borderRadius: '100%',
            width: '75px',
            height:'75px',
          
            position: 'relative',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
            transform:'translate(' +Math.round(Math.random()*88)+ 'vw,' + Math.round(Math.random()*60)+ 'vh)'
    })
    const [correctCounter,setCorrectCounter] = useState(0)
    const [clickCounter,setClickCounter] = useState(0)
    const [accuracy,setAccuracy] = useState(0)
    const [startTime,setStartTime] = useState(false)
    const [Time,setTime] = useState(1)
    const [currentPlayer,setCurrentPlayer] = useState(localStorage.getItem("headHunterPlayer"))
    const [playersData,setPlayersData] = useState([])
    const [render,setRender] = useState(false)
    const updateDataBase = async () => {
        try {
            await axios.post('http://localhost:9191/playerInfo/updatePlayer', {
                name: localStorage.getItem("headHunterPlayer"),
                score: correctCounter,
                accuracy: accuracy
            });
            console.log("posted");
            setRender(true)
        } catch (error) {
            console.error("Error posting data:", error);
        }
        
    };  
        
    useEffect(()=>{
        startTime && Time && setTimeout(()=>{
            setTime(prev=>prev-1)
        },1000)
        if(Time===0){
            updateDataBase()
            
        }
    },[Time,startTime])
    

    
    function handleBallClick(){
        setStartTime(true)
        setCorrectCounter(prev=>prev+1)
        let randomY = Math.round(Math.random()*60)
        let randomX = Math.round(Math.random()*88)
        //setStyling(handleBallStyling(randomY,randomX,1))
        setStyling(prev=>{
            let newStyling = {...prev, transform:'translate(' +randomX + 'vw,' + randomY + 'vh)'}
            return newStyling
        })
        
    }
    function handleDivClick(){
        setClickCounter(prev=>prev+1)
    }
    useEffect(()=>{
        setAccuracy(prev=>{
            if(correctCounter){
                prev = (correctCounter/clickCounter)*100
            }
            return prev
        })
    },[clickCounter,correctCounter])

  return (
    <div >
        <div className='headHunterNav'>
            <Link to='/' className=" btn " style={{margin:'30px 10px '}}>Home Page</Link>
            <div>
                <h1 className='headHunterTitle'>Head Hunter </h1>
            </div>
            {Time?<Link reloadDocument className=" btn " style={{margin:'30px 10px'}}>New Game</Link>:null}
        </div>
        <h3 style={{color:'red',marginTop: '0px'}}>UserName: {currentPlayer} | <p style={{display:'inline', color:'green'}}>TIMER: {Time} sec</p></h3>
        {Time?<h3 style={{color:'red',margin: '0px'}}> Number of hits: {correctCounter} | Accuracy: {parseFloat(accuracy.toFixed(3))}%</h3>:null}
        

        {Time ?<div className='headHunterContainer' onClick={handleDivClick}>
        <Ball 
            onBallClick={handleBallClick}
            style={styling}  
            />
        </div>
        :
        <div>
            <h1 style={{color:'red'}}>Number of hits: {correctCounter} | Accuracy: {parseFloat(accuracy.toFixed(3))}%</h1>
            {/* {playersData && playersData.map((player,index)=>{
                return <h3 key={index}>{player.name} | {player.score} | {player.accuracy}%</h3>
            })} */} {render ? <HeadHunterScoreBoard/>:null}
    
        </div>}
    </div>
  )
}
