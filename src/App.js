import react from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Square(props) {
  return (
      <button 
        className="square"
        onClick={props.onClick}>
          {props.value}
      </button>
  );
}

function ResetButton(props) {
  return (
      <button 
        className="resetButton"
        onClick={props.onClick}>
          {props.value}
      </button>
  );
}

class Board extends react.Component {
   
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />     
    );
  }
  
  render() {
    return (
      <div>
        <div className="displayStatus">{this.props.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>  
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>        
      </div>
    );
  }
}

class Game extends react.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isInitalise: true,
    }
  }
    
  resetGame() {
    {console.log("reset Game")}
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isInitalise: true,
    });
  }
  
  handleClick(i) {
    const historyBoards = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentBoard = historyBoards[historyBoards.length-1];
    const squares = currentBoard.squares.slice();
    const winner = determineWinner(currentBoard.squares);
    if(winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
        history: historyBoards.concat(
          [{
            squares: squares,
        }]),
        stepNumber: historyBoards.length,             
        xIsNext: !this.state.xIsNext,
        isInitalise: this.state.isInitalise ? false:false,
    });    
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
    
  render() {
    
    const historyBoards = this.state.history;
    const currentBoard = historyBoards[this.state.stepNumber];    
    const winner = determineWinner(currentBoard.squares);
    
    const moves = historyBoards.map((squareArray, step) => {
      const desc = step ?
                    "Go to Move #: " + step :
                    "Go to Game Start";
      return (
        <li key={step}>
          <button onClick={()=> this.jumpTo(step)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if(this.state.isInitalise){
      status = "First Player is: X"
    }
    else{
      status = winner ? "Winner is " + winner : "Next Player: " + (this.state.xIsNext ? 'X':'O')
    }
            
    return (
      <div className="game" >
        <div className="game-board">
          <Board
            squares={currentBoard.squares}
            status={status}
            onClick={(i) => this.handleClick(i)}          
          />
          <ResetButton 
            value={'Reset Game'}
            onClick={() => this.resetGame()}
          />       
        </div>        
        <div className="game-info">
          <div>{/* For Status Update*/}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function determineWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],    
  ];
  
  for (let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }
  return null;
}