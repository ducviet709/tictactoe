import React, { Component } from 'react'
import Square from "./Square"

export default class Board extends Component {

    calculateWinner = (squares) => {
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
    

    selectSquare = (id) => {
        let array = this.props.squareList;
        let historyArray = this.props.history;

        if (array[id] !== "") {
            alert("click other square");
            return;
        }
        array[id] = this.props.nextPlayer ? "X" : "O";

        const winner = this.calculateWinner(this.props.squareList);
        let gameOver = false;
        if (!winner && this.props.squareList.every((item) => item !== '')) { 
            gameOver = true 
            this.resetGame();
        } else if (winner !== null){
            this.props.postData()
            this.props.getData()
            this.resetGame()
            
        } else {
            historyArray.push({ squareList: array, nextPlayer: !this.props.nextPlayer })
            this.props.setParentsState({
            squareList: array,
            nextPlayer: !this.props.nextPlayer,
            history: historyArray,
            winner,
            gameOver,
        });
    }};

   resetGame = ()=> {
    this.props.setParentsState({
        squareList: ['', '', '', '', '', '', '', '', ''],
        history: [],
        winner:"",
        gameOver:false,
    });
};


    render() {
        
        let status;
        if (this.props.winner) {
            status = 'Winner: ' + this.props.winner;
        } else if (this.props.gameOver) {
            status = "Game Over"
        }
        else {
            status = 'Next player: ' + (this.props.nextPlayer ? 'X' : 'O');
        }
        return (
            <div>
               
                <h3>{status}</h3>

                <div style={{ display: "flex" }}>
                    <Square id={0} selectSquare={this.selectSquare} value={this.props.squareList[0]} />
                    <Square id={1} selectSquare={this.selectSquare} value={this.props.squareList[1]} />
                    <Square id={2} selectSquare={this.selectSquare} value={this.props.squareList[2]} />
                </div>

                <div style={{ display: "flex" }}  >
                    <Square id={3} selectSquare={this.selectSquare} value={this.props.squareList[3]} />
                    <Square id={4} selectSquare={this.selectSquare} value={this.props.squareList[4]} />
                    <Square id={5} selectSquare={this.selectSquare} value={this.props.squareList[5]} />
                </div>

                <div style={{ display: "flex" }}   >
                    <Square id={6} selectSquare={this.selectSquare} value={this.props.squareList[6]} />
                    <Square id={7} selectSquare={this.selectSquare} value={this.props.squareList[7]} />
                    <Square id={8} selectSquare={this.selectSquare} value={this.props.squareList[8]} />
                </div>

            </div>
        )
    }
}
