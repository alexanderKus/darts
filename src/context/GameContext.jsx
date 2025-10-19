import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <GameContext.Provider value={{ players, setPlayers }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);