import React from 'react'

class Home extends React.Component {

  render(props) {
    return (
      <div>
        <button onClick={this.props.startPlaying}>Start playing</button>
      </div>
    );
  }
}

export default Home
