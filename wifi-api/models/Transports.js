const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transportsSchema = new Schema(
    {
        type: {
            type: Number,
            required: true
        },
        numberTC: {
            type: String,
            required: true
        },
        numberPTC: {
            type: String,
            required: true
        },
        VNTO: {
            type: String,
            required: true
        },
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId
        },
        registrationTime: {
            type: Number,
            default: +new Date()
        },

        currentLocation: {
            type: String,
            default: ''
        },
        destinationPoint: {
            type: String,
            default: ''
        },
    }
);

module.exports = mongoose.model('transports', transportsSchema);