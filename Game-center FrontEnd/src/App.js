import './App.css';
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Lazy load components
const Main = lazy(() => import('./components/main'));
const Board = lazy(() => import('./components/ticTacToe/board'));
const ScoreBoard = lazy(() => import('./components/ticTacToe/scoreBoard'));
const WordleBoard = lazy(() => import('./components/wordle/wordleBoard'));
const BattleShipsBoard = lazy(() => import('./components/battleShips/battleShipsBoard'));
const SlidingPuzzleBoard = lazy(() => import('./components/slidingPuzzle/slidingPuzzleBoard'));
const HeadHunter = lazy(() => import('./components/headHunter/headHunter'));
const SudokuBoard = lazy(() => import('./components/sudoku/sudokuBoard'));

function App() {
  const [isAuthorized] = useState(localStorage.getItem("auth"));
  const [isTicAuth] = useState(localStorage.getItem("authTicTacToe"));

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />

            {isTicAuth === 'true' ? 
            <Route path='/ticTacToe' element={<Board />} />:
            <Route path='/ticTacToe' element={
                <Link to={'/'} className='btn' style={{ marginTop: '50vh', padding: '3%' }}>
                  Unauthorized, go back home
                </Link>
              }/>}

            <Route path='/scoreBoard' element={<ScoreBoard />} />
            <Route path='/wordle' element={<WordleBoard />} />
            <Route path='/battleShips' element={<BattleShipsBoard />} />
            <Route path='/slidingPuzzle' element={<SlidingPuzzleBoard />} />
            <Route path='/sudoku' element={<SudokuBoard />} />

            {isAuthorized === 'true' ? (
              <Route path='/headHunter' element={<HeadHunter />} />
            ) : (
              <Route path='/headHunter' element={
                <Link to={'/'} className='btn' style={{ marginTop: '50vh', padding: '3%' }}>
                  Unauthorized, go back home
                </Link>
              }/>
            )}

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
