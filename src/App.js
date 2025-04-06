import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(structuredClone(boardDefault));
  const [isOpen, setIsOpen] = useState(false);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onRestart = () => {
    setGameOver({
      gameOver: false,
      guessedWord: false,
    });
    const newBoard = [...boardDefault];
    setBoard(newBoard);
    console.log(board);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
  }

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Le prénom n'existe pas");
    }


    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App" lang="fr">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {gameOver.gameOver ? <div></div> :
        <div className="instructions" onClick={() => setIsOpen(!isOpen)}>
          <span class="button-close">
            {isOpen ? "▲" : "▼"}
          </span>
          <h3> Comment jouer ?</h3>
          {isOpen && (
            <p>
              Nous avons une belle nouvelle à vous annoncer ! Mais avant cela, il va falloir jouer un peu.<br /><br />
              Trouvez le prénom en 6 essais ! Chaque tentative doit être un prénom existant de 5 lettres.
              Validez votre réponse en appuyant sur Entrée.<br /><br />
              Après chaque essai, la couleur des cases vous indiquera si vous êtes sur la bonne voie :<br />
              🟩 Vert : La lettre est bien placée.<br />
              🟨 Jaune : La lettre est présente dans le prénom, mais mal placée.<br />
              ⬜ Gris : La lettre ne fait pas partie du prénom à deviner.<br /><br />
              Bonne chance ! 🎉
            </p>
          )}
        </div>
      }
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          onRestart
        }}
      >
        {gameOver.gameOver ? <div></div> : <Board />}
        <div className="game">
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
