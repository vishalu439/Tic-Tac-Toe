import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
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
  const [confetti, setConfetti] = useState(false);
  const [winningCombo, setWinningCombo] = useState([]);

  const markerSpring = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.5)" },
    config: { tension: 300, friction: 10 },
  });

  const winningComboSpring = useSpring({
    opacity: win ? 1 : 0,
    from: { opacity: 0 },
  });

  const handleClick = (id) => {
    if (win || data.flat().every((cell) => cell !== "")) {
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
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
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
        setConfetti(true);
        setWinningCombo(combo); // Store the winning combination
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
    setConfetti(false);
    setWinningCombo([]);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {win && <h1>the winner is {win}</h1>}
      {confetti && <Confetti />}
      <div className="container">
        {data.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellId = `${rowIndex}${colIndex}`;
            const isWinningCell =
              winningCombo.some(([row, col]) => row === rowIndex && col === colIndex) && win;

            return (
              <animated.div
                key={cellId}
                id={cellId}
                className={`card ${isWinningCell ? "winning-cell" : ""}`}
                style={markerSpring}
                onClick={() => handleClick(cellId)}
              >
                {cell}
              </animated.div>
            );
          })
        )}
        {/* Animation for winning combination */}
        <animated.div className="winning-animation" style={winningComboSpring} />
      </div>
      <button onClick={handleRestart}>Restart</button>
    </>
  );
}

export default App;
