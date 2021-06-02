const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId
        },
        status: {
            type: Number,
            required: true,
            default: 1
        },
        authorizationStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        authorizationTime: {
            type: Number,
            required: true,
            default: +new Date()
        },
        userAgent: {
            type: String,
            default: ""
        },
        registrationTime: {
            type: Number,
            default: +new Date()
        },


    }
);



module.exports = mongoose.model('users', usersSchema);