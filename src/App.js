// src/App.js

import React, { useState } from 'react';
import './App.css';

const generateAnswer = () => {
  const numbers = [];
  while (numbers.length < 4) {
    const num = Math.floor(Math.random() * 10);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
};

const App = () => {
  const [answer, setAnswer] = useState(generateAnswer());
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 4 || new Set(guess).size !== 4) {
      setMessage("Enter a 4-digit number with unique digits.");
      return;
    }

    const guessArray = guess.split("").map(Number);
    let hits = 0;
    let blows = 0;

    guessArray.forEach((num, index) => {
      if (num === answer[index]) {
        hits++;
      } else if (answer.includes(num)) {
        blows++;
      }
    });

    setHistory([...history, { guess, hits, blows }]);
    setGuess("");

    if (hits === 4) {
      setMessage("Congratulations! You've guessed the correct number.");
    } else {
      setMessage(`${hits} Hits, ${blows} Blows`);
    }
  };

  return (
    <div className="App">
      <h1>Hit & Blow Game</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={handleChange} maxLength="4" />
        <button type="submit">Guess</button>
      </form>
      <p>{message}</p>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            Guess: {item.guess}, Hits: {item.hits}, Blows: {item.blows}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
