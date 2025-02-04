import React, { useContext } from "react";
import { AppContext } from "../App";
import babyPicture from '../bebe.jpg';

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "Bravo vous avez trouver le prénom !"
          : "Raté ! Retentez votre chance."}
      </h3>
      {gameOver.guessedWord && (
        <p>
          <h1>{correctWord} mesure 50cm et pèse 4,5kg</h1>
          <img src={babyPicture} class="baby" />
        </p>
      )}
    </div>
  );
}

export default GameOver;
