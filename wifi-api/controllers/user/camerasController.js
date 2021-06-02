const Stream = require('node-rtsp-stream')
const Camera = require('../../models/Cameras');
const errorHandler = require('../../utils/errorHandler');



module.exports.getAll = async (req, res) => {
    await console.log("camerasController getAll : ",req.params.objectId);
    try {
        const listCamera = await Camera.find(
            {
                objectId: req.params.objectId,
            }
        );
        await console.log(listCamera);
        res.status(200).json(listCamera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const camera = await Camera.findById(
            {
                _id: req.params.id,
            }
        );
        res.status(200).json(camera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {
    try {
        const newCamera = await new Camera(
            {
                numberCamera: req.body.numberCamera,
                objectId: req.body.objectId,
            }
        ).save();
        res.status(201).json(newCamera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedCamera = await Camera.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedCamera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Camera.remove({_id: req.params.id});
        res.status(200).json({message: "Камера удален из транспорта."});
    } catch (error) {
        errorHandler(res, error);
    }
}