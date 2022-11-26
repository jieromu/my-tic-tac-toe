import react from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

class Square extends react.Component {
  render(){
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends react.Component {
  
  renderSquare(i) {
    return <Square />;
  }
  
  render() {
    
    const status = "Next Player: X";
    
    return (
      <div>
        <div className="displayStatus">{status}</div>
        <div className="board-row-1">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row-2">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>  
        <div className="board-row-3">
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