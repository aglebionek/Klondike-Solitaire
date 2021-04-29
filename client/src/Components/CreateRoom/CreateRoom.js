import React, { useState } from "react";
import "./CreateRoom.css";

function CreateRoom() {
  const initialRoomData = {
    isCreated: false,
    isBeingModified: false,
    name: "Nowy pokój",
    maxPlayers: 2,
    players: [],
  };

  const [roomData, updateRoomData] = useState(initialRoomData);

  const handleNameChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      name: evt.target.value,
    }));
  };

  const handleMaxNumberChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      maxPlayers: parseInt(evt.target.value),
    }));
  };

  const handleRoomCreateButton = (evt) => {
    evt.preventDefault();

    updateRoomData((prevData) => ({
      ...prevData,
      isCreated: true,
      isBeingModified: false,
    }));

    // dopisanie pokoju do listy, zapamietanie w zmiennych sesji/cokolwiek, że pokój istnieje
    // dopisanie do graczy w pokoju zalogowanego usera
  };

  const handleRoomModifyButton = (evt) => {
    evt.preventDefault();

    updateRoomData((prevData) => ({
      ...prevData,
      isBeingModified: true,
    }));

    // aktualizacja danych w socketach
  };

  const handleRoomDisbandButton = (evt) => {
    evt.preventDefault();

    updateRoomData(() => initialRoomData);

    // usuwanie socketa dla pokoju
  };

  if (roomData.isCreated && !roomData.isBeingModified) {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Pokój utworzony</h1>
          <div className="lobby__created-data">
            <p>Nazwa:</p>
            <p>{roomData.name}</p>
          </div>
          <div className="lobby__created-data">
            <p>Maks. ilość graczy:</p>
            <p>{roomData.maxPlayers}</p>
          </div>
          <div className="lobby__created-data__btns">
            <button onClick={handleRoomDisbandButton}>Rozwiąż</button>
            <button onClick={handleRoomModifyButton}>Modyfikuj</button>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Tworzenie pokoju</h1>
          <form
            onSubmit={handleRoomCreateButton}
            className="lobby__create-room-form"
            action=""
          >
            <div>
              <label htmlFor="room-name">Nazwa</label>
              <input
                onChange={handleNameChange}
                value={roomData.name}
                id="room-name"
                name="room-name"
                type="text"
                required
              />
            </div>
            <div>
              <label htmlFor="room-maxplayers">Ilość osób</label>
              <input
                onChange={handleMaxNumberChange}
                value={roomData.maxPlayers.toString()}
                id="room-maxplayers"
                name="room-maxplayers"
                type="number"
                min="2"
                max="5"
                required
              />
            </div>
            <button>{roomData.isBeingModified ? "Zatwierdź modyfikację" : "Utwórz"}</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateRoom;
