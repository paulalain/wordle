import React, { useContext } from "react";
import { AppContext } from "../App";
import babyPicture from '../IMG_4073.jpeg';

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
          <h1>Bravo vous avez trouvé le bon prénom !</h1>
          <h2>Jacob - 6 avril 2025 à 05:37</h2>
          <img src={babyPicture} class="baby" /><br /><br />
          Si vous souhaitez participer voici notre <a href="https://www.majolieliste.fr/liste/449634">liste de naissance</a>.
        </p>
      )}
    </div>
  );
}

export default GameOver;
