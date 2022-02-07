import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from "./Chat"
import Select from 'react-select'

const socket = io.connect("http://localhost:3001");

function App() 
{
  const[username, setusername]=useState("");
  const[room, setRoom]=useState("");
  const[showChat, setShowChat]=useState(false)

  const joinRoom=()=>
  {
    if(username !=="" && room!=="")
    {
        socket.emit('Salle rejointe', {username, room}); 
        setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Bienvenue sur *discord* !</h3>
        <label for="username"></label>
          <input id="username" onChange={(event)=>{setusername(event.target.value);}} type="text" placeholder="Entrer votre pseudo.."></input>
        <label for="room"></label>
        <select id="username" onChange={(event)=>{setRoom(event.target.value);}} type="text" placeholder="Entrer le nom du serveur..">
          <option></option>
          <option>Javascipt</option>
          <option>React</option>
          <option>PHP</option>
        </select>

          <button onClick={joinRoom}>Rejoindre le serveur</button>
      </div>
      )
  :(
      <Chat socket={socket} username={username} room={room}></Chat>
  )}
    </div>
  );
}

export default App;