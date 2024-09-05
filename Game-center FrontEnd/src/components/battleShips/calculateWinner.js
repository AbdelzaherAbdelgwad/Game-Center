import React from 'react'

export default function CalculateWinner(squares, solution) {
    return squares.every(element => !solution.includes(element));
}
