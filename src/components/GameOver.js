import React, { useContext } from "react";
import { AppContext } from "../App";
import babyPicture from '../bebe.jpg';

function GameOver() {
  const {
    gameOver,
    correctWord,
    onRestart
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      {!gameOver.guessedWord && (
        <p>
          C'est raté pour cette fois ! <a href='#' onClick={() => onRestart()}>Clique ici pour retenter ta chance</a>
        </p>
      )}
      {gameOver.guessedWord && (
        <p>
          Bravo vous avez trouver le prénom !
          <h1>{correctWord} est né aujourd'hui à xx:xx</h1>
          <img src={babyPicture} class="baby" /><br /><br />
          Si vous souhaitez participer voici notre <a href="https://www.majolieliste.fr/liste/449634">liste de naissance</a>.
        </p>
      )}
    </div>
  );
}

export default GameOver;
