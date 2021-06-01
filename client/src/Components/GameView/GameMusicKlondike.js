import Sound from 'react-sound';
import React from 'react';
import soundCyber from '../../soundtrack/Music/Music_Cyberpunk_Klondike.mp3';
import soundDefault from '../../soundtrack/Music/Music_Synthwave_Klondike.mp3';

const GameMusic = ({musicVolume, cardset}) => {
  const sound = [soundCyber, soundDefault];

    return (
      <div>
            <Sound
              url ={sound[cardset-1]}
              volume={musicVolume}
              playStatus={Sound.status.PLAYING}
              autoLoad={true}
              playFromPosition={100}
              loop={true}
           />  
      </div>  
    );
  };

export default GameMusic;