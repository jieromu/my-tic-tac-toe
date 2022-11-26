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
        style={{ height: 50, width: 50, marginTop: 5}}
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
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
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
    
    const status = "Next Player: " + (this.state.xIsNext ? 'X':'O');
    
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
      </div>
    );
  }
}

class Game extends react.Component {
  
  render() {
    return (
      <div className="game">
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