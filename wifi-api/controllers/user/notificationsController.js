const Notifications = require('../../models/Notifications');
const errorHandler = require('../../utils/errorHandler');

// =====================NOTIFICATIONS====================
module.exports.getAll = async (req, res) => {
    try {
        const notifications = await Notifications.find(
            {companyId: req.user.companyId}
        );

        res.status(200).json(notifications);
    } catch (error) {
        errorHandler(res, error);
    }
}
