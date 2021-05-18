import sound from '../../soundtrack/Music/Music_Menu_Klondike.mp3';
import Sound from 'react-sound';
import React, {useState, useEffect} from 'react';
import axios from "axios";


const MenuMusic = (props) => {

    const pos = props.test;
    const userId = 10;
    const [isPlaying, setIsPlaying] = useState(false);
    const [vol, setVolume] = useState(100);

    useEffect(() => {
        axios.get(`http://localhost:3000/settings/${userId}`).then(({ data }) => {
          const { carset_id, volume, effect, card_animation } = data;
          setVolume(volume);
        });
      }, []);
  
    return (
      <div>
      <button onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Stop'}</button>
            <Sound
            url ={sound}
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
            volume={vol}
            loop={true}
            //playFromPosition={pos}
          //  onPause
            
                  
            
        />  
        </div>  
    );
  };

export default MenuMusic;