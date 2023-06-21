import React from 'react';



const VideoPlayer = ({sources}) => {
  return (<iframe
          className='react-player'
          src={sources[1]}
          width='100%'
          height='100%'
        />)
}

export default VideoPlayer;
