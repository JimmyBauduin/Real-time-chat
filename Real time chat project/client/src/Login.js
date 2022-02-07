import './Login.css';
import io from 'socket.io-client'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import Chat from "./Chat"
// import {useNavigate} from 'react-router-dom'

const socket = io.connect("http://localhost:3001");

function Login() {
  const[username, setusername]=useState("");
  const[room, setRoom]=useState("");

  const joinRoom=()=>
  {
    if(username !=="" && room!=="")
    {
        socket.emit("join_room", room);      
    }
  }

  return (
    <div className="App">
      <div className='joinChatContainer'>
        <h3>Bienvenue sur *discord* !</h3>
        <label for="username"></label>
          <input id="username" onChange={(event)=>{setusername(event.target.value);}} type="text" placeholder="Entrer votre pseudo.."></input>
        <label for="room"></label>
          <input
            onChange={(event)=>{setRoom(event.target.value);}} 
            type="text" 
            placeholder="Entrer le nom du channel..">
          </input>

          <button onClick={joinRoom}>Rejoindre le serveur</button>
          <Chat socket={socket} username={username} room={room}></Chat>
      </div>
    </div>
  );
}

export default Login;