import React, {useState, useEffect} from 'react';
import axios from "axios";
import MainMenu from './MainMenu';

const ButtonSound =()=> {

    const [vol, setVolume] = useState(100);
    const userId = 10;
    
    useEffect(() => {
        axios.get(`http://localhost:3000/settings/${userId}`).then(({ data }) => {
          const { carset_id, volume, effect, card_animation } = data;
          setVolume(effect);
        });
      }, []);
   
    
    return (
      <div>
        <MainMenu volumeDlaDziecka={vol} />
      </div>
    )
        
}


export default ButtonSound;