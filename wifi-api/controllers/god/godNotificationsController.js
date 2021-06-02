const Notifications = require('../../models/Notifications');
const Users         = require('../../models/Users');
const Company         = require('../../models/Company');
const errorHandler = require('./../../utils/errorHandler');


// =====================NOTIFICATIONS====================
module.exports.create = async (req, res) => {
    try {
        const newNotification = await new Notifications(
            {
                companyId: req.body.companyId,
                title: req.body.title,
                message: req.body.message,
                author: req.body.author
            }
        ).save();
        let company = await Company.findById({_id:req.body.companyId});
        res.status(201).json({message: `Оповещение для компании ${company.name} добавлено.`});
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        let notification = await Notifications.findById(
            {
                _id: req.params.id,
            }
        );
        let author = await Users.findById({_id:notification.author});
        notification.author = author.name
        res.status(200).json(notification);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedCamera = await Notifications.findOneAndUpdate(
            {_id: req.params.id},
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
        await Notifications.remove({_id: req.params.id});
        res.status(200).json({message: "Оповещение удалено из списка компании."});
    } catch (error) {
        errorHandler(res, error);
    }
}
