import sound from '../../soundtrack/Music/Music_Synthwave_Klondike.mp3';
import Sound from 'react-sound';
import React, {useState, useEffect} from 'react';



const GameMusic = ({musicVolume}) => {

    
  
    return (
      <div>
            <Sound
            url ={sound}
            volume={musicVolume}
            playStatus={Sound.status.PLAYING}
            autoLoad={true}
            playFromPosition={100}
            loop={true}
            //playFromPosition={pos}
          //  onPause

        />  
        </div>  
    );
  };

export default GameMusic;