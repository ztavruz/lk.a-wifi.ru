const Users         = require('../../models/Users');
const Company       = require('../../models/Company');
const Transports    = require('../../models/Transports');
const Builds        = require('../../models/Builds');
const Cameras       = require('../../models/Cameras');
const Videos        = require('../../models/Videos');
const Notifications = require('../../models/Notifications');
const errorHandler  = require('./../../utils/errorHandler');


// =====================COMPANY====================
module.exports.getAll = async (req, res) => {
    try {
        const listCompany = await Company.find();
        res.status(200).json(listCompany);
        console.log(+new Date())
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const currentCompany = await Company.findById(
            {
                _id: req.params.id,
            }
        );
        res.status(200).json(currentCompany);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {

    console.log(req.body);
    const newCompany = await new Company(
        {
            name: req.body.name,
            INN: req.body.INN,
        }
    )

    try {
        newCompany.save().then(() => {
            res.status(201).json(newCompany)
        });
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedCompany);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await       Company.remove({_id: req.params.id});
        await       Users.remove({companyId: req.params.id});
        await       Notifications.remove({companyId: req.params.id});
        await       Transports.remove({companyId: req.params.id});
        await       Cameras.remove({companyId: req.params.id});
        await       Videos.remove({companyId: req.params.id});
        res.status(200).json({message: "Компания удалена (и все транспорты на неё зарегистрированные и камеры к ним относящиеся)."});
    } catch (error) {
        errorHandler(res, error);
    }
}

//получить всех пользователей выбранной компании
module.exports.getAllUsers = async (req, res) => {
    console.log(req.params.id)
    try {
        const transports = await Users.find(
            {
                companyId: req.params.id,
            }
        );

        res.status(200).json(transports);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}

//получить все транспорты выбранной компании
module.exports.getAllTransports = async (req, res) => {
    console.log(req.params.id)
    try {
        const transports = await Transports.find(
            {
                companyId: req.params.id,
            }
        );
        console.log(transports)

        res.status(200).json(transports);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}

//получить все здания выбранной компании
module.exports.getAllBuilds = async (req, res) => {
    await console.log(req.params.id);
    try {
        const transports = await Builds.find(
            {
                companyId: req.params.id,
            }
        );
        console.log(transports)

        res.status(200).json(transports);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}

//получить все оповещения выбранной компании
module.exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find(
            {
                companyId: req.params.id,
            }
        );
        res.status(200).json(notifications);
    } catch (error) {
        errorHandler(res, error);
        // res.status(500)
    }
}