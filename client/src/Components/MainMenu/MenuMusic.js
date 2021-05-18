import sound from '../../soundtrack/Music/Music_Menu_Klondike.mp3';
import Sound from 'react-sound';
import React, {useState, useEffect} from 'react';



const MenuMusic = ({musicVolume}) => {

    
  
    return (
      <div>
            <Sound
            url ={sound}
            volume={musicVolume}
            playStatus={Sound.status.PLAYING}
            autoLoad={true}
            playFromPosition={300}
            loop={true}
            //playFromPosition={pos}
          //  onPause

        />  
        </div>  
    );
  };

export default MenuMusic;