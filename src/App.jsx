import React, { useState } from "react";
import Confetti from "react-confetti"; // Import react-confetti
import "./App.css";

function App() {
  const initialData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [data, setdata] = useState(initialData);
  const [move, setmove] = useState("X");
  const [win, setwin] = useState(null);

  const [confetti, setConfetti] = useState(false); // State to control confetti

  const handleClick = (id) => {
    if (win || data.flat().every((cell) => cell !== "")) {
      // Game is over or all cells are filled
      return;
    }

    const row = parseInt(id[0]);
    const col = parseInt(id[1]);
    setmove(move === "X" ? "O" : "X");
    if (data[row][col] === "") {
      const newData = [...data];
      newData[row][col] = move;
      setdata(newData);
      checkWinner(newData);
    }
  };

  const checkWinner = (squares) => {
    const winningCombos = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a[0]][a[1]] &&
        squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
        squares[a[0]][a[1]] === squares[c[0]][c[1]]
      ) {
        setwin(move);
        setConfetti(true); // Activate confetti when there's a winner
        return;
      }
    }

    if (squares.flat().every((cell) => cell !== "")) {
      setwin("Draw");
    }
  };

  const handleRestart = () => {
    setdata(initialData);
    setwin(null);
    setmove("X");
    setConfetti(false); // Deactivate confetti when restarting
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {win && <h1>the winner is {win}</h1>}
      {confetti && <Confetti />} {/* Display confetti when there's a winner */}
      <div className="container">
        <div id="00" className="card" onClick={() => handleClick("00")}>
          {data[0][0]}
        </div>
        <div id="01" className="card" onClick={() => handleClick("01")}>
          {data[0][1]}
        </div>
        <div id="02" className="card" onClick={() => handleClick("02")}>
          {data[0][2]}
        </div>
        <div id="10" className="card" onClick={() => handleClick("10")}>
          {data[1][0]}
        </div>
        <div id="11" className="card" onClick={() => handleClick("11")}>
          {data[1][1]}
        </div>
        <div id="12" className="card" onClick={() => handleClick("12")}>
          {data[1][2]}
        </div>
        <div id="20" className="card" onClick={() => handleClick("20")}>
          {data[2][0]}
        </div>
        <div id="21" className="card" onClick={() => handleClick("21")}>
          {data[2][1]}
        </div>
        <div id="22" className="card" onClick={() => handleClick("22")}>
          {data[2][2]}
        </div>
      </div>
      <button onClick={handleRestart}>Restart</button>
    </>
  );
}

export default App;
