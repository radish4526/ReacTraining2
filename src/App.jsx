"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
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
    const [answer, setAnswer] = (0, react_1.useState)(generateAnswer());
    const [guess, setGuess] = (0, react_1.useState)("");
    const [history, setHistory] = (0, react_1.useState)([]);
    const [message, setMessage] = (0, react_1.useState)("");
    const handleChange = (e) => {
        setGuess(e.target.value);
    };
    const handleSubmit = (e) => {
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
            }
            else if (answer.includes(num)) {
                blows++;
            }
        });
        setHistory([...history, { guess, hits, blows }]);
        setGuess("");
        if (hits === 4) {
            setMessage("正解!!!");
        }
        else {
            setMessage(`${hits} Hits, ${blows} Blows`);
        }
    };
    const handleRemove = () => {
        const newHistory = [];
        const newmessage = "";
        setHistory(newHistory);
        setMessage(newmessage);
        setAnswer(generateAnswer());
    };
    return (<div className="App">
      <h1>Hit & Blow</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={handleChange} maxLength={4}/>
        <button type="submit">推測</button>
        <button type='button' onClick={() => handleRemove()}>やり直し</button>
      </form>
      <p>{message}</p>
      <h2>履歴</h2>
      <ul>
        {history.map((item, index) => (<li key={index}>
            推測: {item.guess}, Hits: {item.hits}, Blows: {item.blows}
          </li>))}
      </ul>
    </div>);
};
exports.default = App;
