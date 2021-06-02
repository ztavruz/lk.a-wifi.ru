const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema(
    {
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId
        },
        objectId: {
            type: String,
            default: ""
        },
        cameraId: {
            ref: 'camera',
            type: Schema.Types.ObjectId
        },

        filename: {
            type: String,
            default: ""   //уникальное имя файла присваемое
            // при сохранении файла
        },
        startVideo: {
            type: String,
            default: ""
        },
        endVideo: {
            type: String,
            default: ""
        },

        entireFile: {
            type: Boolean,
            default: false  //полный или не полный файл
        },
        registrationTime: {
            type: Number,
            default: +new Date()
        },
    }
);
module.exports = mongoose.model('videos', videoSchema);