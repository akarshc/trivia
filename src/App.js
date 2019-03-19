import React from 'react'
import MQA from './Containers/MQA'
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Trivia</h1>
        </div>
        <div className="main">
          <MQA />
        </div>
      </div>
    );
  }
}

export default App
