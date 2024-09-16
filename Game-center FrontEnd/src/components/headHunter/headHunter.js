import React, { useEffect } from 'react'
import Ball from './ball'
import { Link } from "react-router-dom";
import { useState } from 'react'

export default function HeadHunter() {   
    const [styling,setStyling] = useState({
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
    const [Time,setTime] = useState(60)
    
    useEffect(()=>{
        startTime && Time && setTimeout(()=>{
            setTime(prev=>prev-1)
        },1000)
    },[Time,startTime])
    

    
    function handleBallClick(){
        setStartTime(true)
        if(correctCounter===3){
            const endTime = new Date().getTime()
            console.log(Math.floor((endTime-startTime)/1000))
        }
        
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
            <Link to='/' className="btn">Home Page</Link>
            <h1>Head Hunter</h1>
            <Link reloadDocument className="btn">New Game</Link>
        </div>
        
        {Time?<h3 style={{color:'red'}}>Number of hits: {correctCounter} | Accuracy: {accuracy}%</h3>:null}
        <h3 style={{color:'red'}}>TIMER: {Time} sec</h3>

        {Time ?<div className='headHunterContainer' onClick={handleDivClick}>
        <Ball 
            onBallClick={handleBallClick}
            style={styling}
            
            />
    </div>:<h1 style={{marginTop:'30vh',color:'red'}}>Number of hits: {correctCounter} | Accuracy: {accuracy}%</h1>}
    </div>
  )
}
