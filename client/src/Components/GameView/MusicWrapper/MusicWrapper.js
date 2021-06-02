import React from "react";
import GameMusic from "../GameMusicKlondike";

const MusicWrapper =
  (WrappedComponent) =>
  ({ effect, volume, cardset_id }) => {
    return (
      <>
        {volume > 0 && <GameMusic musicVolume={volume} cardset={cardset_id} />}
        <WrappedComponent effect={effect} volume={volume} />
      </>
    );
  };

export default MusicWrapper;
