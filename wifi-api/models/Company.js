const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    INN: {
        type: Number,
        required: true
    },
    registrationTime: {
        type: Number,
        default: +new Date()
    },

});

module.exports = mongoose.model('company', companySchema);