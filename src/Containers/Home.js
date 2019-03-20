import React from 'react'

const Home = ({startPlaying}) => {
    return (
      <div>
        <button onClick={startPlaying}>Start playing</button>
      </div>
    );
}

export default Home
