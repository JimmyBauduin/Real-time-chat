const moment = require('moment');

function formatMessage(username, msg){
 return {
     username:username,
     msg:msg,
     time: moment().format('h:mm a')
 }
}

module.exports = formatMessage;