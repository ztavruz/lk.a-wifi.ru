const Builds = require('../../models/Builds');
const errorHandler = require('../../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const builds = await Builds.find(
            {
                companyId: req.user.companyId,
            }
        );
        res.status(200).json(builds);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const build = await Builds.findById(
            {
                _id: req.params.id,
            }
        );
        res.status(200).json(build);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const build = await Builds.findById(
            {
                _id: req.params.id,
            }
        );
        res.status(200).json(build);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.searchByField = async (req, res) => {
    try {
        let build = {}
        if(req.body.typeSearchField == "адресу"){
            build = await Builds.find(
                {
                    address: req.body.searchInput,
                }
            );
        }else if(req.body.typeSearchField == "VIN"){
            build = await Builds.find(
                {
                    VNTO: req.body.searchInput,
                }
            );
        }

        res.status(200).json(build);
    } catch (error) {
        errorHandler(res, error);
    }
}

// module.exports.create = async (req, res) => {
//     try {
//         console.log(req.user);
//         const newBuild = await new Builds(
//             {
//                 type: req.body.type,
//                 numberTC: req.body.numberTC,
//                 companyId: req.user.companyId,
//             }
//         ).save();
//         res.status(201).json(newBuild);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }

module.exports.update = async (req, res) => {
    try {
        const updatedBuild = await Builds.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            );
        res.status(200).json(updatedBuild);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Builds.remove({_id: req.params.id});
        res.status(200).json({message: "Здание удалено из списка компании."});
    } catch (error) {
        errorHandler(res, error);
    }
}
