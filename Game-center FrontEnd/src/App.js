import './App.css';
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/logIn/login';

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
  const [isAuthorized] = useState(localStorage.getItem("auth") === 'true');
  const [isTicAuth] = useState(localStorage.getItem("authTicTacToe") === 'true');
  const [isLogin, setIsLogin] = useState(localStorage.getItem("Login") === 'true'); //localStorage.getItem("Login") === 'true'

  function handleLogin(state) {
    setIsLogin(state);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            {isLogin ? (
              <>
                <Route path='/home' element={<Main />} />
                <Route path='/ticTacToe' element={
                  isTicAuth ? <Board /> : 
                  <Link to='/' className='btn' style={{ marginTop: '50vh', padding: '3%' }}>
                    Unauthorized, go back home
                  </Link>
                } />
                <Route path='/scoreBoard' element={<ScoreBoard />} />
                <Route path='/wordle' element={<WordleBoard />} />
                <Route path='/battleShips' element={<BattleShipsBoard />} />
                <Route path='/slidingPuzzle' element={<SlidingPuzzleBoard />} />
                <Route path='/sudoku' element={<SudokuBoard />} />
                <Route path='/headHunter' element={
                  isAuthorized ? <HeadHunter /> :
                  <Link to='/' className='btn' style={{ marginTop: '50vh', padding: '3%' }}>
                    Unauthorized, go back home
                  </Link>
                } />
                <Route path='*' element={<Navigate to='/home' />} />
              </>
            ) : (
              <Route path='*' element={<Navigate to='/login' />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;