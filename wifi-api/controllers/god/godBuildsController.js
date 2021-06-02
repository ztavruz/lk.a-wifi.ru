const Builds = require('../../models/Builds');
const Camera = require('../../models/Cameras');
const Videos = require('../../models/Videos');

const errorHandler = require('./../../utils/errorHandler');

// =====================TRANSPORTS====================
module.exports.getById = async (req, res) => {
    try {

        let buildId = req.params.id;

        if (!buildId) {
            res.status(404).json({message: "Не передан _id строения для поиска"});
        } else {

            const build = await Builds.findById(
                {
                    _id: req.params.id,
                }
            );
            await console.log("build getById :", build);
            res.status(200).json(build);
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const newBuild = await new Builds(
            {
                type: req.body.objectType,
                address: req.body.address,
                VNTO: req.body.VNTO,
                companyId: req.body.companyId,
            }
        ).save();
        await console.log("build create :", newBuild);
        res.status(201).json(newBuild);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        await console.log(req.body);
        const updatedBuild = await Builds.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        await console.log("build updatedBuild :", updatedBuild);
        res.status(200).json(updatedBuild);
    } catch (error) {
        errorHandler(res, error);
    }
}

// получить все камеры здания по id транспорта
module.exports.getAllCamera = async (req, res) => {
    console.log(req.params.id)
    try {
        const cameras = await Camera.find(
            {
                objectId: req.params.id,
            }
        );
        await console.log("build getAllCamera :", cameras);
        res.status(200).json(cameras);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}


module.exports.getAll = async (req, res) => {
    try {
        const builds = await Builds.find();
        await console.log("build getAll :", builds);
        res.status(200).json(builds);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Videos.remove({objectId: req.params.id});
        await Camera.remove({objectId: req.params.id});
        await Builds.remove({_id: req.params.id});
        await console.log("build remove :", "ок");
        res.status(200).json({message: "Здание и закрепленные за ним видеокамеры удалены."});
    } catch (error) {
        errorHandler(res, error);
    }
}
