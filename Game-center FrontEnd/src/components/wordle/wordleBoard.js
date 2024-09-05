/* eslint-disable no-loop-func */
import React, { useState,useRef,useEffect } from 'react'
import WordleSquare from './wordleSquare';
import { Link } from "react-router-dom";
import axios from "axios";
import Confetti from 'react-confetti';
export default function WordleBoard() {
    const[boardSquares,setBoardSquares] = useState(Array(25).fill(null))
    const[word,setWord] = useState("")
    const[disabled,setDisabled] = useState([false,...Array(25).fill(true)])
    const[solution,setSolution] = useState("")
    const[squareValue,setSquareValue] = useState([])
    const[winner,setWinner] = useState(false)
    const[styles,setStyles] = useState(Array(25).fill({}))
    const[allWords,setAllWords] = useState([])
    const[loading, setLoading] = useState(true)


    //FOCUS ON INPUT
    const inputRef = useRef([]);
    const focusElement = (index) => {
        if (index<=24 && inputRef.current[index]) {
            inputRef.current[index].focus();
            //remove element when press backspace
            inputRef.current[index].value =""
        }
      };
    //get all english words
    useEffect(()=>{ axios.get('./allWords.json')
        .then((res)=>{setAllWords(res.data);
        setLoading(false);
        })
    },[])  
    //the solution
    useEffect(()=>{axios.get("https://random-word-api.herokuapp.com/word?length=5")
        .then((res)=>{setSolution(res.data[0]);
        inputRef.current[0].focus();
        })
    },[loading])
          
    
      
    //HANDLE CHANGE FOR INPUT 
    function handelChange(e,index){
       
        //don't make changes if there we have empty squares
        if(e.target.value !== "" ){
            //if you got the right answer, don't make changes
            if(!calculateWin(word+e.target.value,index)){
                //check if the user entered a real word
                if((index+1)%5 === 0 & !checkCorrectWord(word+e.target.value,index)){
                    setSquareValue((prevX) => {
                        const newX = [...prevX]; 
                        newX[index] = e.target.value; 
                        return newX; 
                    });
                    return null

                }
            setWord((letter)=>{
                const newLet = e.target.value.toLowerCase()
                if(letter.length>4){
                    return newLet
                }
                const newWord = letter.concat(newLet)
                return newWord
            })
            setSquareValue((prevX) => {
                const newX = [...prevX]; 
                newX[index] = e.target.value; 
                return newX; 
            });   
            setDisabled((prev)=>{
                const newArray = [...prev]
                newArray[index]= true
                newArray[index +1]= false
                return newArray
            })     
            setTimeout(() => focusElement(index+1), 0);
            computeCorrectLetters(word+e.target.value,index)      
        } else{
            computeCorrectLetters(word+e.target.value,index)      
            setDisabled(Array(25).fill(true))
            setWinner(true)
        }
        
    
    }
        
    }
    // handle delete elements
    function handleBackSpace (e,index){
        if(e.code=== "Backspace"){
             //change the word value
             setWord((prevWord)=>{
                const newWord = prevWord.slice(0, -1)
                return newWord
            })
            //can't delete the previous word (word completed with 5 letters)
            if(index%5 !== 0 ){
            setSquareValue((prevSquareValue)=>{const newSquareValue = [...prevSquareValue]; 
                newSquareValue[index] = ""; 
                return newSquareValue;})
            //stop deleting when 0 index
            if(index > 0){
                setDisabled((prev)=>{
                    const newArray = [...prev]
                    newArray[index]= true
                    newArray[index -1]= false
                    return newArray
            })
        }
            setTimeout(() => focusElement(index-1), 0);}
                  
        }
        
    }
    //Check that user entered a real english word 
    function checkCorrectWord(value,index){
        if((index+1)%5 ===0 && value.length === 5){
            for(let x=0;x<allWords.length;x++){
                if(value === allWords[x]){
                    return true
                }
            }
            return false
        }
    }
    //Calculate winner
    function calculateWin(value,index){
        if((index+1)%5 ===0){
            if(value === solution){
                return true
            }
            else{
                return false
            }
        }
    }
    //Coloring the right letters
    function computeCorrectLetters(value, index) {
        let testWord = solution; 
        const prevStyles = [...styles]; 
    
        if ((index + 1) % 5 === 0) {
            for (let x = 0; x < value.length; x++) {
                if (value[x] === solution[x]) {
                    prevStyles[x + index - (index % 5)] = { backgroundColor: 'green' };
                    // Remove the used character from testWord
                    testWord = testWord.replace(value[x], '');
                }
            }
    
            for (let x = 0; x < value.length; x++) {
                const charIndex = testWord.indexOf(value[x]);
                if (charIndex !== -1) {
                    prevStyles[x + index - (index % 5)] = { backgroundColor: 'yellow' };
                }
            }    
            setStyles(prevStyles);
        }
    }

  return (
    <div>
        {(loading)?<h1>...Loading Game</h1>:<h1>Wordle</h1>}
        
        <h4>"Guess the 5-letter word in 5 attempts or less to win!" 🎉</h4>
        {!loading && <div className="wordleBoard">
            {boardSquares.map((value,index)=> 
                {
                    return <WordleSquare 
                                key={index}     
                                value={squareValue[index]} 
                                onKeyDown={(e)=>handleBackSpace(e,index)} 
                                onChange={(e)=>handelChange(e,index)} 
                                disabled = {disabled[index]} 
                                refs ={(el) => (inputRef.current[index] = el)}
                                style={styles[index]}
                                />
                })}  
        </div>}
        {solution}
        {((squareValue.length === 25) && checkCorrectWord(word,24)) && <h3>You lost, the word was: {solution}</h3>}
        <Link reloadDocument to='/wordle' className="btn">New Game</Link>
        <Link to='/' className="btn">Home Page</Link>
        {winner? <><Confetti/> <h2>Congratulation you got the right answer</h2></>:null}

    </div>
  )
}
