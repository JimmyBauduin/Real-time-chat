import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { useState } from 'react';
import './Chat.css';

function Chat({socket, username, room})
{
    const[currentMessage, setCurrentMessage]=useState("");
    const[messageList, setMessageList]=useState([]);

    const envoieMessage=async()=>
    {
        if(currentMessage!=="" && currentMessage!=="/user")
        {
            await socket.emit("chatMessage", currentMessage);
            setMessageList((list)=>[...list, currentMessage]);
        }

        else if(currentMessage ==="/user")
        {
            await socket.emit("listeuser", currentMessage);
            setMessageList((list)=>[...list, currentMessage]);
        }
    };

    const reload=()=>{
        document.location.reload();
    }

    useEffect(()=>{
        socket.on("message", (data)=>{
            setMessageList((list)=> [...list, data]);
        });
    },[socket]);

    useEffect(()=>{
        socket.on("output-messages", (message)=>{
            if (message.length) 
            {
                message.forEach(messages =>
                {
                    setMessageList((list)=> [...list, messages]);
                });
            }
            
        });
    },[socket]);

    return(
        <div>
            <div class="chat-container">
                <header class="chat-header">
                    <h1>Projet Discord</h1>

                    <button class="btnquitter" onClick={reload} type="button" id="refresh">Quitter la salle</button>
                    
                </header>
                <main class="chat-main">
                    <div class="chat-sidebar">
                        <h3><i class="fas fa-comments"></i>Choix du serveur :</h3>
                        <h2 id="room-name">
                        <h3>{room}</h3>
                        </h2>
                        <h3><i class="fas fa-users"></i>Connecté en tant que : {username}</h3>
                        <ul id="users"></ul>
                    </div>
                    <div class="chat-messages">
                        {messageList.map((messageContent)=>{
                            return (
                                <div className='message'>
                                    <div>
                                        <div className='message-content'>
                                            <h3>{messageContent.msg}</h3>
                                        </div>
                                        <div className='message-meta'>
                                            <p>{messageContent.time}</p>
                                            <p>{messageContent.username}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <div class="chat-form-container">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Message"
                        required
                        autocomplete="off"
                        onChange={(event)=>{setCurrentMessage(event.target.value);}}
                    />

                    <button onClick={envoieMessage} class="btn">Envoyer</button>
                </div>
            </div>
        </div>

    );
}
export default Chat;