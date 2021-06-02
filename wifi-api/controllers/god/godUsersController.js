const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys-api');

const Users = require('./../../models/Users');
const errorHandler = require('./../../utils/errorHandler');

// =====================USERS====================
module.exports.jwt = async (req, res) => {

    const candidate = await Users.findOne({login: req.body.login});
    // await console.info("Данные входящие: ", req.body);
    // await console.info("Данные поиска: ", candidate);
    if (!candidate) {
        //conflict
        res.status(404).json({
            message: "Такой login не найден! Выберите другой ..."
        })
    } else {

        const validate = await bcrypt.compareSync(req.body.password, candidate.password);
        await console.log("validate: ", validate);
        if (validate) {

            if (candidate.status != 3) {
                res.status(401).json({
                    message: "Не достаточный уровень доступа"
                })
            } else {
                const token = jwt.sign(
                    {
                        email: candidate.email,
                        userId: candidate._id,
                        companyId: candidate.companyId,
                        status: candidate.status
                    },
                    keys.SECRET,
                    {expiresIn: 160 * 160}
                );

                // console.log("jwt: ",token);

                res.status(200).json({
                    token: `Bearer ${token}`
                })
            }

        } else {
            //conflict
            res.status(401).json({
                message: "Введён не верный пароль"
            })
        }

    }
}

module.exports.login = async (req, res) => {
    try {
        const user = await Users.findById(
            {
                _id: req.user._id,
            }
        );
        if (user.status != 3) {
            res.status(401).json({
                message: "Не достаточный уровень доступа"
            })
        } else {
            res.status(200).json(
                {
                    _id: user._id,
                    name: user.name,
                    companyId: user.companyId,
                },
            );
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const users = await Users.findById(
            {
                _id: req.params.id,
            }
        );
        res.status(200).json(users);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {

    const candidate = await Users.findOne({login: req.body.login});
    await console.info("Данные входящие: ", req.body);
    await console.info("Данные поиска: ", candidate);

    if (candidate) {
        //conflict
        res.status(409).json({
            message: "ТАкой email уже зарегистрирован! Выберите другой ..."
        })
    } else {
        let salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);

        const user = new Users({
            login: req.body.login,
            password: password,
            name: req.body.name,
            companyId: req.body.companyId,
            status: req.body.status,
        });

        await console.log("newUser: ", user);

        try {
            user.save().then(() => {
                res.status(201).json(user)
            });
        } catch (error) {
            errorHandler(res, error);
        }
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedUsers = await Users.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedUsers);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Users.remove({_id: req.params.id});
        res.status(200).json({message: "Пользователь удален НАХЕР)))."});
    } catch (error) {
        res.status(500).json({message: "Ошибка сервера"});
    }
}

