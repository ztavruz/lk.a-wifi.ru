const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildsSchema = new Schema(
    {
        type: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            default: ''
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

module.exports = mongoose.model('builds', buildsSchema);