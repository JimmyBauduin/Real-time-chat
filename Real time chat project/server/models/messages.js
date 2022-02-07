const mongoose = require ('mongoose');

const msgSchema = new mongoose.Schema({
    msg:{
        type: String
    },
    time: {
        type: String
    },
    username:{
        type: String
    }
});

const Msg = mongoose.model('contenusmessage', msgSchema);
module.exports = Msg;