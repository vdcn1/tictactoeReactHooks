import './App.css';
import {useState, useEffect} from 'react'
import Square from './Components/Square';
import Alert from 'react-bootstrap/Alert'

function AlertSquare({square}) {
  return (
    <Alert variant="success">
      The winner is {square}
    </Alert>
  );
}

function App() {
  const [matrix, setMatrix] = useState(Array(3).fill("").map(() => new Array(3).fill("")))
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({state: "none", player: "none"})
  const [pos, setPos] = useState({row: 0, col: 0})
  let row, col;
  
  useEffect(() => {
     checkWin();

  }, [pos])

  useEffect(() => {
    if(result.state !== "none"){
      if(result.state !== "tie"){
        alert(`The winner is: ${result.player}`)
      }
      else{
        alert("It's a tie!")
      }
    }
  }, [result])

  const chooseSquare = (row, col) => {
    setMatrix(() => {
      if(matrix[row][col] === ""){
        matrix[row][col] = player
      }
      return matrix
    });

    if(player === "X") {
      setPlayer("O");
    }
    else {
      setPlayer("X");
    }

    setPos({row: row, col: col})
  }

  const checkWin = () => {
    let isWin = false;
  
    let arr = []
    // horizontal
    for(let i = 0; i < 3; i++){
      arr.push(matrix[pos.row][i]);
    }

    checkLine(arr)
    arr = []
    //vertical
    for(let i = 0; i < 3; i++) {
      arr.push(matrix[i][pos.col])
    }

    checkLine(arr)
    arr = []
    //main diagonal
    if(pos.row === pos.col){
      for(let i = 0; i < 3; i++){
        arr.push(matrix[i][i])
      }
    }

    checkLine(arr);
    arr = []
    //second diagonal
    for(let i = 0; i < 3; i ++){
      arr.push(matrix[i][2-i])
    }

    checkLine(arr);
    if(!isWin){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < matrix[i].length; j++){
          if(matrix[i][j] === "") return;
        }
      }
      setResult({state:"tie", player:"none"})
    }
  }

  const checkLine = (line) => {
    let isPX = false;
    let isPO = false;
    
    for(let i = 0; i < line.length; i++){
      if(line[i] === "X"){
        isPX = true;
      }
      if(line[i] === "O"){
        isPO = true;
      }
      if(line[i] === ""){
        isPX = false;
        isPO = false;
        return false;
      }
    }

    if(isPX !== isPO){
      if(isPX){
        setResult({state:"winner", player: "X"})
        return true;
      }
      if(isPO){
        setResult({state:"winner", player: "O"})
        return true;
      }
    }
    return false;
  }


  return (
    <div className="App">
      <div className="matrix">
        <div className="row">
          <Square value={matrix[0][0]} setValue={() => chooseSquare(0, 0)}/>
          <Square value={matrix[0][1]} setValue={() => chooseSquare(0, 1)}/>
          <Square value={matrix[0][2]} setValue={() => chooseSquare(0, 2)}/>
        </div>
        <div className="row">
          <Square value={matrix[1][0]} setValue={() => chooseSquare(1, 0)}/>
          <Square value={matrix[1][1]} setValue={() => chooseSquare(1, 1)}/>
          <Square value={matrix[1][2]} setValue={() => chooseSquare(1, 2)}/>
        </div>
        <div className="row">
          <Square value={matrix[2][0]} setValue={() => chooseSquare(2, 0)}/>
          <Square value={matrix[2][1]} setValue={() => chooseSquare(2, 1)}/>
          <Square value={matrix[2][2]} setValue={() => chooseSquare(2, 2)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
