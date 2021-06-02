const Users = require('../../models/Users');
const Company = require('../../models/Company');

const keys = require('../../config/keys-api');
// let keys = require ('../../config/keys')

const bcrypt = require('bcryptjs');
const errorHandler = require('./../../utils/errorHandler');

// =====================IT-AM====================
module.exports.skynetcompanycreate = async (req, res) => {

    try {
        const candidate = await Company.findOne(
            {
                INN: keys.SKYNET_INN,
            }
        );

        if (candidate) {
            res.status(404).json({message: "Компания SKYNET уже была зарегистрированна"})
        } else {
            const newCompany = await new Company(
                {
                    name: "SKYNET_COMPANY",
                    INN: keys.SKYNET_INN,
                }
            )
            newCompany.save().then(() => {
                res.status(201).json({message: "skynet ready"})
            });
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.skynetusercreate = async (req, res) => {

    try {
        const company = await Company.findOne(
            {
                INN: keys.SKYNET_INN
            }
        );

        if (!company) {
            res.status(404).json({
                message: "error not company"
            })
        } else {

            const candidate = await Users.findOne(
                {
                    login: "skynet1987@mail.ru",
                    name: "SKYNET"
                }
            );

            if (candidate) {
                res.status(409).json({
                    message: "god unit exists"
                })
            } else {

                let salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync("0jtpjm1305", salt);

                const user = await new Users({
                    login: "skynet1987@mail.ru",
                    password: password,
                    name: "SKYNET",
                    companyId: company._id,
                    status: 3,
                });
                await user.save().then(() => {
                    res.status(200).json("god unit ready")
                });
            }
        }
    } catch (error) {
        errorHandler(res, error);
    }

}

module.exports.skynetcompanyremove = async (req, res) => {

    try {
        const company = await Company.findOne(
            {
                INN: keys.SKYNET_INN
            }
        );
        if(!company){
            res.status(404).json({message: "skynet not found"});
        }else{
            await Company.remove({_id: company._id});
            await Users.remove({companyId: company._id});
            res.status(200).json({message: "skynet destroyed full"});
        }

    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.skynetuserremove = async (req, res) => {

    try {
        const candidate = await Users.findOne(
            {
                name: "SKYNET",
            }
        );

        if(!candidate){
            res.status(404).json({message: "god unit not found"});
        }else{
            await Users.remove({name: "SKYNET"});
            res.status(200).json({message: "god unit destroyed"});
        }

    } catch (error) {
        errorHandler(res, error);
    }

}
