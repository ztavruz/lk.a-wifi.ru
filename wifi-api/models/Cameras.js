const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cameraSchema = new Schema(
    {
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId
        },
        objectId: {
            type: String,
            default: ""
        },
        reboot: {
          type: Boolean,
          default: false
        },
        numberCamera: {
            type: String,
            default: "" // уникальный номер камеры
        },
        nameCamera: {
            type: String
        },
        latestVideoId: {
            type: String,
            default: "" // сюда сохраняется в переменной дата последнего скаченного видеофайла
        },

        registrationTime: {
            type: Number,
            default: +new Date()
        },

        tcpTimeRequest: {
            type: String,
            default: ""
        },
        liveTimeRequest: {
            type: String,
            default: ""
        },
        archiveTimeRequest: {
            type: String,
            default: ""
        },

    }
);
module.exports = mongoose.model('cameras', cameraSchema);