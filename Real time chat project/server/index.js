const path = require('path');
const http = require('http');
const express = require('express');
const formatMessage = require('./affichage/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./affichage/utilisateurs');

const app = express();
const {Server}= require("socket.io")

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
    },
});

const mongoose = require('mongoose');
const Msg = require('./models/messages')
const mongodb = 'mongodb+srv://jimmy:root@cluster0.7linm.mongodb.net/messages-database?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connecté à la base de donnée MONGODB')
}).catch(err => console.log(err))

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'EpiBot';

var user=new Array();

function outputUsers(users) 
{
    user.push(users)
    console.log("Liste des utilisateurs : "+user)
}

function deleteUsers()
{
    user.pop();
    console.log("Utilisteur a quitté discord, liste des utilisateurs sur discord : "+user)
}

function getUsers()
{
    return user
}

//Démarrage lors de la connexion d'un client
io.on('connection', socket => 
{
    console.log("User connected : "+socket.id)
    
    socket.on('Salle rejointe', ({ username, room }) =>
    {
        console.log(room);
        const user = userJoin(socket.id, username, room);
        
        console.log(user);
        
        socket.join(user.room);
        
        socket.emit('message', formatMessage(botName, 'Bienvenue dans notre chat Projet Epitech !'));
        
        //Diffusion lors d'une connexion
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} à rejoint le chat`));
        outputUsers(user.username);
        
        Msg.find().then(result => 
        {
            console.log(result)
            socket.emit('output-messages', result)
        })
    });

    socket.on('Salle rejointe', ({ username, room }) =>
    {
        //Ecouter le chatMessage
        socket.on('chatMessage', (msg) => 
        {
            //envoie à la base de donnée
            const moment = require('moment');
            
            let time = moment().format('h:mm a')
            
            console.log(time);
            const users = userJoin(socket.id, username, room);
            const object = {msg : msg, time : time, username : users.username}
            console.log(object);
            const message = new Msg({msg,username,time});

            const user = getCurrentUser(socket.id);
            message.save().then(() =>
            {
                io.to(user.room).emit('message', formatMessage(user.username, msg));
            })
        });

        socket.on('listeuser', (data) =>
        {
            const user = getCurrentUser(socket.id);
            const nombreuser=getCurrentUser(room);
            io.to(user.room).emit('message', formatMessage(botName, "Liste des utilisateurs dans la room "+room+" : "+getUsers()));
        })
    });

        //Fonction lors de la deconnexion
        socket.on('disconnect', () =>
        {
            const user = userLeave(socket.id);

            deleteUsers();

            console.log("User disconnect : "+socket.id)

            if(user)
            {
                io.to(user.room).emit('message', formatMessage(botName, `${user.username} à quitter le chat`));

                //Envoyer les informations utilisateurs et salon
                io.to(user.room).emit('roomUsers',
                {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }
        });

});

server.listen(3001, ()=>{
    console.log("Serveur démarré");
});