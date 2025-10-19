import {useEffect, useState} from "react";
import {getCheckouts} from "../helpers/checkoutCalculator.js";
import {INIT_SCORE} from "../contants/gameContants.js";

const Player = ({player: {name, score, turn}, deleteFn}) => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    setCheckouts(getCheckouts(INIT_SCORE - score));
  }, [score])

  return (
    <div className={`relative flex flex-col p-5 mx-10 my-2 border-1 rounded ${turn && 'border-green-500'}`}>
      <button onClick={deleteFn} className="absolute top-1 right-2 text-sm text-red-400 hover:text-red-800 cursor-pointer">
        ✕
      </button>
      <div>Name: <span className="font-bold">{name}</span></div>
      <div>Score: <span className="font-bold">{INIT_SCORE - score}</span></div>
      {checkouts.length > 0 && (
        <div className="mt-1">
          Possible Checkouts:
          <div className="flex flex-col p-1 text-xs text-gray-300">
            {checkouts.map((c) => (
              <p key={c}>- {c}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Player;