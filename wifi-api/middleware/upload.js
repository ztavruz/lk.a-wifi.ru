const multer = require('multer');
const moment = require('moment');

const  storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}` )
    }
})

const  fileFilter = (req, file, cb) => {
    if(file.mimeType === 'image/png' ||
        file.mimeType === 'image/jpeg' ||
        file.mimeType === 'video/mpeg' ||
        file.mimeType === 'video/mp4'
    )
    {
        cd(null, true)
    }else{
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 100
}


module.exports = multer(
    {
        storage,
        fileFilter,
        limits
    }
)