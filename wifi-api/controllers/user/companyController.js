const Company = require('../../models/Company');
const errorHandler = require('../../utils/errorHandler');



// =====================COMPANY====================

module.exports.getById = async (req, res) => {
    try {
        const currentCompany = await Company.findById(
            {
                _id: req.user.companyId,
            }
        );
        res.status(200).json(currentCompany);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedCompany);
    } catch (error) {
        errorHandler(res, error);
    }
}


