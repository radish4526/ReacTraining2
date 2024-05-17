import './App.css';
import { useState } from 'react';

function App() {
  const num = () => Math.floor(Math.random() * 10);
  const [rand, setRand] = useState([Array(3).fill(null)]);

  return (
    <div className="App">
      <button onClick={() => setRand(num())}>乱数</button>
      <p>{rand}</p>
    </div>
  );
}

export default App;
