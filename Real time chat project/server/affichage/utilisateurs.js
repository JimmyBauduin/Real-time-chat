const users = [];

// Faire rejoindre l'utilisateur dans le chat

function userJoin(id, username, room){
    const user = { id, username, room };

    users.push(user);

    return user;
}

//obtenir l'utilisateur actuel
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//Utilisateur quitte le chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

//obtenir la salle de l'utilisateur
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};