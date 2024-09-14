import React, { useState } from 'react';
import './App.css';

const generateAnswer = () => {
  const numbers: number[] = [];
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
  const [guess, setGuess] = useState<string>("");
  const [history, setHistory] = useState<HitBlowObject[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 入力した数字が4桁の異なる数字か判定
    if (guess.length !== 4 || new Set(guess).size !== 4) { 
      alert("4桁の異なる数字を入力してください。");
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
      setMessage("正解!!!");
    } else {
      setMessage(`${hits} Hits, ${blows} Blows`);
    }
  };

  const handleRemove = () => {
    const newHistory: HitBlowObject[] = [];
    const newmessage = "";
    setHistory(newHistory);
    setMessage(newmessage);
    setAnswer(generateAnswer());
  }

  interface HitBlowObject {
    guess: string;
    hits: number;
    blows: number;
  }

  return (
    <div className="App">
      <h1>Hit & Blow</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={handleChange} maxLength={4} />
        <button type="submit">推測</button>
        <button type='button' onClick={() => handleRemove()}>やり直し</button>
      </form>
      <p>{message}</p>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            推測: {item.guess}, Hits: {item.hits}, Blows: {item.blows}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
