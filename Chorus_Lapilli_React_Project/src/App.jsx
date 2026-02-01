import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [twoClicks, setTwoClicks] = useState([-1,-1]);
  const [currClick, setCurrClick] = useState(0);
  const [numXs, setNumXs] = useState(0);
  const [numOs, setNumOs] = useState(0);

  function validMove(first, second){
    switch (first) {
      case 0:
        return (second == 1 || second == 4 || second == 3);
        break;
      
      case 1:
        return (second == 0 || second == 2 || second == 4 || second == 3 || second == 5);
        break;

      case 2:
        return (second == 1 || second == 4 || second == 5);
        break;

      case 3:
        return (second == 0 || second == 1 || second == 4 || second == 6 || second == 7);
        break;

      case 4:
        return true;
        break;

      case 5:
        return (second == 1 || second == 2 || second == 4 || second == 7 || second == 8);
        break;

      case 6:
        return (second == 3 || second == 4 || second == 7);
        break;

      case 7:
        return (second == 3 || second == 4 || second == 5 || second == 6 || second == 8);
        break;

      case 8:
        return (second == 4 || second == 5 || second == 7);
        break;

      default:
        return false;
    }
  }
  function handleClick(i) {
    /*let numXs = 0;
    let numOs = 0;*/
    if(calculateWinner(squares)){
      return;
    }
    /*for(let j = 0; j < squares.length; j++){
      if(squares[j] == 'X'){
        numXs++;
      }
      if(squares[j] == 'O'){
        numOs++;
      }
    }*/
    const nextSquares = squares.slice();
    if(xIsNext && numXs > 2){
      if(currClick == 0){
        if(squares[i] != 'X'){
          return;
        }
        else{
          setCurrClick(1);
          setTwoClicks([i,-1]);
        }
      }
      else{
        if(squares[i]){
          return;
        }
        if(validMove(twoClicks[0], i)){
          twoClicks[1] = i;
        }
        else{
          return;
        }
        nextSquares[twoClicks[1]] = 'X';
        nextSquares[twoClicks[0]] = null;
        if(squares[4] == 'X' && nextSquares[4] == 'X' && !calculateWinner(nextSquares)){
          return;
        }
        setTwoClicks([-1,-1]);
        setCurrClick(0);
        setXIsNext(!xIsNext);
      }
    }
    else if(!xIsNext && numOs > 2){
      if(currClick == 0){
        if(squares[i] != 'O'){
          return;
        }
        else{
          setCurrClick(1);
          setTwoClicks([i,-1]);
        }
      }
      else{
        if(squares[i]){
          return;
        }
        if(validMove(twoClicks[0], i)){
          twoClicks[1] = i;
        }
        else{
          return;
        }
        nextSquares[twoClicks[1]] = 'O';
        nextSquares[twoClicks[0]] = null;
        if(squares[4] == 'O' && nextSquares[4] == 'O' && !calculateWinner(nextSquares)){
          return;
        }
        setTwoClicks([-1,-1]);
        setCurrClick(0);
        setXIsNext(!xIsNext);
      }
    }
    else if (xIsNext) {
      nextSquares[i] = 'X';
      setNumXs(numXs + 1);
      setXIsNext(!xIsNext);
    }
    else {
      nextSquares[i] = 'O';
      setNumOs(numOs + 1);
      setXIsNext(!xIsNext);
    }
    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
