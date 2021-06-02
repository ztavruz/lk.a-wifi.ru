const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const godSchema = new Schema(
    {
        email: {
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
        },
        status: {
            //1-god
            //2-admin
            //3-user
            type: String,
            required: true
        },
        companyId: {
            ref: 'company',
            type: Schema.Types.ObjectId,
            required: true
        },


    }
);



module.exports = mongoose.model('users', godSchema);