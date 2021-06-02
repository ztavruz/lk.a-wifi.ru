const Transports = require('../../models/Transports');
const Camera        = require('../../models/Cameras');

const errorHandler = require('./../../utils/errorHandler');

// =====================TRANSPORTS====================
module.exports.getById = async (req, res) => {
    try {

        let transportId = req.params.id;

        if(!transportId){
            res.status(404).json({message: "Не передан _id транспорта для поиска"});
        }else{

            const transport = await Transports.findById(
                {
                    _id: req.params.id,
                }
            );
            res.status(200).json(transport);
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const newTransport = await new Transports(
            {
                type:      req.body.type,
                numberTC:  req.body.numberTC,
                numberPTC: req.body.numberPTC,
                VNTO:      req.body.VNTO,
                companyId: req.body.companyId,
            }
        ).save();
        res.status(201).json(newTransport);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        await console.log(req.body);
        const updatedTransport = await Transports.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedTransport);
    } catch (error) {
        errorHandler(res, error);
    }
}

// получить все камеры транспорта по id транспорта
module.exports.getAllCamera = async (req, res) => {
    console.log(req.params.id)
    try {
        const cameras = await Camera.find(
            {
                objectId: req.params.id,
            }
        );
        console.log(cameras)

        res.status(200).json(cameras);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}


module.exports.getAll = async (req, res) => {
    try {
        const objects = await Transports.find();
        res.status(200).json(objects);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getByType = async (req, res) => {
    try {
        let transportType = req.params.type;

        const objects = await Transports.find(
            {
                type: transportType,
            }
        );
        res.status(200).json(objects);

    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Transports.remove({_id: req.params.id});
        await Camera.remove({transportId: req.params.id});
        res.status(200).json({message: "Транспорт и закрепленные за ним видеокамеры удалены."});
    } catch (error) {
        errorHandler(res, error);
    }
}
