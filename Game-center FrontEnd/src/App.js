import './App.css';
import Board from './components/ticTacToe/board';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './components/main';
import ScoreBoard from './components/ticTacToe/scoreBoard';
import WordleBoard from './components/wordle/wordleBoard';
import BattleShipsBoard from './components/battleShips/battleShipsBoard';
import SlidingPuzzleBoard from './components/slidingPuzzle/slidingPuzzleBoard';
import HeadHunter from './components/headHunter/headHunter';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/board' element={<Board />}/>
          <Route path='/scoreBoard' element={<ScoreBoard />}/>
          <Route path='/wordle' element={<WordleBoard />}/>
          <Route path='/battleShips' element={<BattleShipsBoard/>} />
          <Route path='/slidingPuzzle' element={<SlidingPuzzleBoard />}/>
          <Route path='/headHunter' element={<HeadHunter />}/>
          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
