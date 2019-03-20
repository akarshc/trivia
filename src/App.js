import React from 'react'
import MQA from './Containers/MQA'
import Home from './Containers/Home'
import BG from './Images/bg.jpg'

const initialState = {
    app: false
}
class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.startPlaying = this.startPlaying.bind(this)
  }
  startPlaying = () => {
    this.setState({
      app: true
    })
  }
  render() {
    return (
      <div className="container">
      {!this.state.app ? <div className="bg"><img src={BG} alt="bg" /></div> : null}
      {!this.state.app ? <div className="bg_inside" /> : null}
        <div className="header">
          <h1 className="title" onClick={()=> this.setState({app: false})}>trivia</h1>
        </div>
        <div className="main">
          {this.state.app ? <MQA /> : <Home startPlaying={this.startPlaying} />}
        </div>
      </div>
    );
  }
}

export default App
