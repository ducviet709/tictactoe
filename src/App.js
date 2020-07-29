import React, { Component } from 'react'
import Board from "./components/Board"
import "./App.css"


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "Trump",
      nextPlayer: true,
      squareList: ['', '', '', '', '', '', '', '', ''],
      history: [],

    }
  }

  setParentsState = (obj) => {
    this.setState(obj)
  }

  backToPast = (index) => {
    //1. grab the histroy
    let past = this.state.history[index];
    //2. change the value squareList,nextPlayer
    this.setState({
      ...this.state,
      squareList: past.squareList,
      nextPlayer: past.nextPlayer,
    });
  };
 

  render() {
    

    return (
      <div className="main">
        <div>
        <h1>Tic Tac Toe</h1>
        <h3> User name : {this.state.userName}</h3>
        {/* <h3>nextPlayer:{this.state.nextPlayer}</h3> */}
        <ol>History{this.state.history.map((_, index) => {
          return (<li> <button onClick={() => this.backToPast(index)}> Go To:{index + 1}</button></li>)
        })}
        </ol>
        </div>
        <Board
          // squareList={this.state.squareList}
          setParentsState={this.setParentsState}
          // nextPlayer={this.state.nextPlayer}
          // history={this.state.history}
          {...this.state}
        />
      </div>
    )
  }
}

