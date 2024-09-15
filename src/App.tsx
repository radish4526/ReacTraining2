import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

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
    const newmessage: string = "";
    setHistory(newHistory);
    setMessage(newmessage);
    setAnswer(generateAnswer());
  };

  interface HitBlowObject {
    guess: string;
    hits: number;
    blows: number;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <Typography textAlign="center" variant="h3" mt={15}>
          Hit & Blow
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box display="flex" justifyContent="center" mt={4}>
              <Box mr={6}>
                <TextField
                  required
                  label="4桁の異なる数字"
                  variant="outlined"
                  type="text"
                  value={guess}
                  onChange={handleChange}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    startIcon={<PsychologyAltIcon />}
                  >
                    推測
                  </Button>
                </Box>
                <Box>
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemove()}
                  >
                    やり直し
                  </Button>
                </Box>
              </Box>
            </Box>
          </FormControl>
        </form>
        <Box mt={3}>
          <Typography variant="h6" textAlign="center">
            {message}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">履歴</Typography>
          <Box height={250} overflow="scroll">
            <List>
              {history.map((item, index) => (
                <ListItem key={index}>
                  {index + 1}回目　推測：{item.guess}　Hits：{item.hits}
                  　Blows：
                  {item.blows}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
