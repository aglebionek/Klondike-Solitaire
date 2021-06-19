/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import soundCyber from '../../../soundtrack/Music/Music_Cyberpunk_Klondike.mp3';
import soundDefault from '../../../soundtrack/Music/Music_Synthwave_Klondike.mp3';



const AudioPlayer = ({ musicVolume, cardset }) => {
    
    const src = [soundCyber, soundDefault];
    const [trackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const audioRef = useRef(new Audio(src[cardset-1]));
    audioRef.current.volume = (musicVolume/100);
    const intervalRef = useRef();
    const isReady = useRef(false);

    setTimeout(
        Play, 2000
      )
      function Play(){
        setIsPlaying(true);
      }
  
    
    const startTimer = useCallback(() => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
            if (isPlaying) {
                setIsPlaying(false);
                setIsPlaying(true);
              }
              startTimer();
        } 
      }, [1000]);
    });
    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying, startTimer]);
  

    useEffect(() => {
      audioRef.current.pause();
  
      audioRef.current = new Audio(src[cardset-1]);
  
      if (isReady.current) {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
    }, [trackIndex]);
  
    useEffect(() => {
      return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      };
    }, []);
  
    return (
      <div className="audio-player">
      </div>
    );
  };
  
  export default AudioPlayer;
  