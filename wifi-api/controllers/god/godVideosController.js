const Videos = require('../../models/Videos');
const errorHandler = require('../../utils/errorHandler');


module.exports.getAll = async (req, res) => {
    try {
        const listCamera = await Videos.find();
        res.status(200).json(listCamera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {
    try {
        let newVideo = await new Videos(
                {
                    companyId:      req.body.companyId,
                    objectId:       req.body.objectId,
                    cameraId:       req.body.cameraId,
                    filename:       req.body.filename,
                }
            ).save();
        res.status(201).json(newVideo);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedVideo = await Videos.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedVideo);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {

}

module.exports.removeEmptyRecords = async (req, res) => {
    // d878f084a67cd756]2020-11-29Y163000-2020-11-29Y170000.mp4

    try {
        await Videos.remove({_id: req.params.id});
        res.status(200).json({message: "Видео удалено из архива транспорта компании."});
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Videos.remove({_id: req.params.id});
        res.status(200).json({message: "Видео удалено из архива транспорта компании."});
    } catch (error) {
        errorHandler(res, error);
    }
}



// ===============================================================================================
// module.exports.createTest = async (req, res) => {
//     try {
//         const newVideo = await new Videos(
//             {
//                 companyId:      "5fdc7f4673e30ec8dcf398f6",
//                 transportId:    "5fe270e075ce48beba7771f6",
//                 cameraId:       "5fe270f575ce48beba7771f7",
//                 filename:       "Пофиг",
//                 entireFile:     true
//             }
//         ).save();
//         res.status(201).json(newVideo);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
