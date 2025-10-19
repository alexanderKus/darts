import './App.css'
import {useEffect, useState} from "react";
import Player from "./components/Player.jsx";
import Modal from "./components/Modal.jsx";
import {INIT_SCORE} from "./contants/gameContants.js";
import {useGame} from "./context/GameContext.jsx";

function App() {
  const { players, setPlayers } = useGame();
  const [currentScore, setCurrentScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPlayerModalOpen, setIsNewPlayerModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const currentPlayerName = players.find(p => p.turn)?.name || '';

  useEffect(() => {
    if (players.some(p => p.score === INIT_SCORE))
      setIsModalOpen(true);
  }, [players]);

  const addPlayer = () => {
    setIsNewPlayerModalOpen(true);
  }

  const removePlayer = (playerId) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  }

  const handleScore = (e) => {
    const score = Number(e.target.value);
    setCurrentScore(score)
  }

  const addScore = () => {
    setPlayers(prev => {
      if (prev.length > 1) {
        return prev.map((p, i) => {
          if (p.turn) {
            return { ...p, score: p.score + currentScore, turn: false };
          } else if (i === (prev.findIndex(p => p.turn) + 1) % prev.length) {
            return { ...p, turn: true };
          } else {
            return p;
          }
        })
      }
      return prev.map((p) => {
        return { ...p, score: p.score + currentScore, turn: true };
      })
    })
    setCurrentScore(0);
  }

  const handleNewPlayer = (e) => {
    const name = e.target.value;
    setNewPlayerName(name);
  }

  const addNewPlayer = () => {
    resetPlayersStatus()
    const id = players.length > 0 ? players[players.length - 1].id + 1 : 0;
    const player = {
      id: id,
      name: newPlayerName,
      score: 0,
      turn: id === 0
    }
    setPlayers((prev) => [...prev, player]);
    setIsNewPlayerModalOpen(false);
    setNewPlayerName("");
  }

  const gameOver = () => {
    resetPlayersStatus()
    setIsModalOpen(false)
  }

  const resetPlayersStatus = () => {
    if (players.some(p => p.score !== 0)) {
      setPlayers(prev =>
        prev.map(p => ({
          ...p,
          score: 0,
          turn: p.id === 0
        }))
      );
    }
  }

  return (
    <div className="flex flex-col justify-between lg:justify-normal h-dvh items-center bg-gray-700 text-white pt-4">
      <div className="text-6xl">==Darts==</div>
      {players.length > 0
        ?
          <div className="flex flex-wrap justify-center items-center my-1 lg:my-10 overflow-auto">
            {players.map(player => (
              <Player player={player} deleteFn={() => removePlayer(player?.id)} key={player?.id} />
            ))}
            <button className="px-3 py-1 border-1 border-yellow-200 text-yellow-200 rounded-full text-lg flex items-center justify-center" onClick={addPlayer}>+</button>
          </div>
        :
        <>
          <button className="mt-10 px-3 py-1 border-1 border-yellow-200 text-yellow-200 rounded-full text-lg flex items-center justify-center" onClick={addPlayer}>+</button>
          <div className="py-2 text-3xl underline">Add a player to start a game.</div>
        </>
      }

      {players.length > 0 && (
        <div className="flex flex-col items-center mt-4 mb-10 lg:mb-1">
          <label htmlFor="input-score" className="flex items-center mb-2">Enter score for: <span className="underline">{currentPlayerName}</span></label>
          <input type="number" name="input-score" min="0" value={currentScore} className="border-1 rounded-xl px-2 mb-2 focus:border-sky-500" onChange={handleScore} />
          <button className="border-1 rounded-xl px-2 cursor-pointer" onClick={addScore}>Add Score</button>
        </div>
      )}

      <Modal isOpen={isNewPlayerModalOpen} onClose={() => setIsNewPlayerModalOpen(false)}>
        <h2 className="text-xl mb-2 font-bold">{players.length < 6 ?  'Add new player' : 'Cannot add more players'}</h2>
        <input type="text" name="input-score" value={newPlayerName} className="border-1 rounded-xl px-2 mb-2 focus:border-sky-500" onChange={handleNewPlayer} />
        <button className="border-1 rounded-xl px-2 cursor-pointer disabled:bg-gray-400" onClick={addNewPlayer} disabled={players.length >= 6}>Add Player</button>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={gameOver}>
        <h2 className="text-xl mb-2 font-bold">Game Over</h2>
        <p>{currentPlayerName} has won!</p>
      </Modal>
    </div>
  )
}

export default App
