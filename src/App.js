import { Button, Typography } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [rand, setRand] = useState([Array(3).fill(null)]);
  const num = () => Math.floor(Math.random() * 10);

  return (
    <div className="App">
      <Button variant='contained' onClick={() => setRand([num(), num(), num()])}>3つの数字</Button>
      <Typography variant='h5'>{rand}</Typography>
    </div>
  );
}

export default App;
