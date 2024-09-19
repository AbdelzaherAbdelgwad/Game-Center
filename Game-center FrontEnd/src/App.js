import './App.css';
import React from 'react';
import Board from './components/ticTacToe/board';
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
import Main from './components/main';
import ScoreBoard from './components/ticTacToe/scoreBoard';
import WordleBoard from './components/wordle/wordleBoard';
import BattleShipsBoard from './components/battleShips/battleShipsBoard';
import SlidingPuzzleBoard from './components/slidingPuzzle/slidingPuzzleBoard';
import HeadHunter from './components/headHunter/headHunter';
import { useContext,useState } from 'react';

function App() {
  // Authentication???

  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("auth"));
  

  return (

        <div className="App">
    <BrowserRouter>
      <Routes >
          <Route path='/' element={<Main />}/>
          <Route path='/ticTacToe' element={<Board />}/>
          <Route path='/scoreBoard' element={<ScoreBoard />}/>
          <Route path='/wordle' element={<WordleBoard />}/>
          <Route path='/battleShips' element={<BattleShipsBoard/>} />
          <Route path='/slidingPuzzle' element={<SlidingPuzzleBoard />}/>
          {isAuthenticated === 'true'? <Route path= '/headHunter' element= {<HeadHunter /> }/> : <Route path= '/headHunter' element={<Link to={'/'} className='btn' style={{marginTop:'50vh',padding:'3%'}}> unauthorized, go back home</Link>}/>  }
          
          
      </Routes>
    </BrowserRouter>
    </div>

    
  );
}

export default App;
