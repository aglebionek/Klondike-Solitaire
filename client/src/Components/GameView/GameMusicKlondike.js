import Sound from 'react-sound';
import React, {useState} from 'react';
import soundCyber from '../../soundtrack/Music/Music_Cyberpunk_Klondike.mp3';
import soundDefault from '../../soundtrack/Music/Music_Synthwave_Klondike.mp3';

const GameMusic = ({musicVolume, cardset}) => {
  const sound = [soundCyber, soundDefault];
  const [isPlaying, setIsPlaying] = useState(false);

  setTimeout(
    Play, 2000
  )
  function Play(){
    setIsPlaying(true);
  }


    return (
      <div>
            <Sound
              url ={sound[cardset-1]}
              volume={musicVolume}
              playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
              autoLoad={true}
              playFromPosition={100}
              loop={true}
           />  
      </div>  
    );
  };

export default GameMusic;