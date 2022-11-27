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
  
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if(determineWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
  }
  
  resetGame() {
    {console.log("reset Game")}
    this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
      });
  }
  
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />     
    );
  }
  
  render() {
    
    const winner = determineWinner(this.state.squares);
    let status;
    if(winner){
      status = "Winner is " + winner;
    }
    else{
      status = "Next Player: " + (this.state.xIsNext ? 'X':'O');
    }
    
    return (
      <div>
        <div className="displayStatus">{status}</div>
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
        <div className="reset-row">
          <ResetButton 
            value={'Reset Game'}
            onClick={() => this.resetGame()}
          />
        </div>
      </div>
    );
  }
}

class Game extends react.Component {
  
  render() {
    return (
      <div className="game" >
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* For Status Update*/}</div>
          <ol>{/* ToDO */}</ol>
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