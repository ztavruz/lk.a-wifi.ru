const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema(
    {
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId
        },
        title : {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        registrationTime: {
            type: Number,
            default: +new Date()
        },
    }
);

module.exports = mongoose.model('notifications', notificationsSchema);