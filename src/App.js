import React, { Component } from 'react'
import Board from "./components/Board"
import "./App.css"
import FacebookLogin from 'react-facebook-login';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "Trump",
      nextPlayer: true,
      squareList: ['', '', '', '', '', '', '', '', ''],
      history: [],
      rank:[],
      winner:"",
      gameOver:false,
      login:[],

    }
  }

  setParentsState = (obj) => {
    this.setState(obj)
  }

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", "Trump");
    data.append("score", 5);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
      // this.getData;
  };

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    console.log('result: ', result);
    this.setState({
      rank:  result.items
    })
  }

  responseFacebook=(data)=>{
    this.setState({
      login: data
    })
    console.log('data: ', data);


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
          <ol>History{this.state.history.map((_, index) => {
            return (<li> <button onClick={() => this.backToPast(index)}> Go To:{index + 1}</button></li>)
          })}
          </ol>
          <ol>Ranking{this.state.rank.map(({player,score})=>{
            return (<li>{player}:{score}</li>)
          })}</ol>
        </div>
        <Board
          postData={this.postData}
          getData={this.getData}
          // squareList={this.state.squareList}
          setParentsState={this.setParentsState}
          // nextPlayer={this.state.nextPlayer}
          // history={this.state.history}
          {...this.state}
        />
        <div className="App">
          <FacebookLogin
            autoLoad={true}
            appId="573012196912329"
            fields="name,email,picture"
            callback={ this.responseFacebook}
            
          />
        </div>
      </div>

    )
  }
}

