import React from 'react'
import './sixteenPuzzle.css'

export default function SixteenPuzzleSquare(props) {
  return (
    <div>
        <div className="sixteenSquare" onClick={props.onSquareClick} style={props.style}>
        <h1 className="sixteenPuzzleValues">{props.value}</h1>
        </div>
    </div>
    
  )
}
