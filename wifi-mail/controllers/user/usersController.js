const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../../wifi-api/config/keys-api');
const Users = require('../../models/Users');
const errorHandler = require('../../utils/errorHandler');

module.exports.jwt = async (req, res) => {

    const candidate = await Users.findOne({login: req.body.login});
    // await console.info("Данные входящие: ", req.body);
    // await console.info("Данные поиска candidate: ", candidate);
    // let startAuthorization = candidate.authorizationTime;
    // let endAuthorization = startAuthorization + 300000;
    // await console.info("startAuthorization: ", startAuthorization);
    // await console.info("endAuthorization: ", endAuthorization);

    if (candidate == null) {
        //conflict
        res.status(404).json({
            message: "Такой LOGIN не найден! Выберите другой ..."
        })
    } else {
        let startAuthorization = candidate.authorizationTime;
        let endAuthorization = startAuthorization + 300000;
        await console.info("startAuthorization: ", startAuthorization);
        await console.info("endAuthorization: ", endAuthorization);
        const validate = bcrypt.compareSync(req.body.password, candidate.password);
        console.log("validate: ", validate);
        if (validate) {
            if
            (candidate.authorizationStatus == false) {
            // (endAuthorization <= +new Date()) {
                const token = jwt.sign(
                    {
                        login: candidate.login,
                        userId: candidate._id,
                        companyId: candidate.companyId,
                        status: candidate.status,
                        userAgent: req.body.userAgent
                    },
                    keys.SECRET,
                    {expiresIn: 60 * 60}
                );
                // console.log("jwt: ",token);

                res.status(200).json({
                    token: `Bearer ${token}`
                })
            }
            else if
            (
                candidate.authorizationStatus == true
                &&
                endAuthorization <= +new Date()
                // candidate.userAgent == req.body.userAgent
            ) {
                await console.log("авторизован но вне сессии");
                const token = jwt.sign(
                    {
                        login: candidate.login,
                        userId: candidate._id,
                        companyId: candidate.companyId,
                        status: candidate.status,
                        userAgent: req.body.userAgent
                    },
                    keys.SECRET,
                    {expiresIn: 60 * 60}
                );
                // console.log("jwt: ",token);

                res.status(200).json({
                    token: `Bearer ${token}`
                })
            }
            else if
            (
                candidate.authorizationStatus == true
                &&
                endAuthorization >= +new Date()
                // candidate.userAgent != req.body.userAgent
            ) {
                await console.log("авторизован и в сессии");
                res.status(209).json({
                    message: "Ошибка. Данный пользователь уже в сети..."
                });
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
        // await console.log(req.headers);
        const user = await Users.findById(
            {
                _id: req.user._id,
            }
        );

        await Users.findOneAndUpdate(
            {_id: user._id},
            {
                $set:
                    {
                        authorizationStatus: true,
                        userAgent: req.headers.useragent
                    }
            },
            {new: true}
        );

        res.status(200).json(
            {
                _id: user._id,
                name: user.name,
                companyId: user.companyId
            },
        );

    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.logout = async (req, res) => {
    try {

        const user = await Users.findById(
            {
                _id: req.user._id,
            }
        );
        if (user.authorizationStatus == true) {
            await Users.findOneAndUpdate(
                {_id: user._id},
                {$set: {authorizationStatus: false}},
                {new: true}
            );
            res.status(200).json({
                message: `Пользователь ${user.name}, разлогинен!`
            });

        } else if (user.authorizationStatus == true) {
            res.status(209).json({
                message: "Ошибка. Данный пользователь уже разлогинен..."
            });
        }

    } catch (error) {
        errorHandler(res, error);
    }
}
module.exports.logouttest = async (req, res) => {
    try {
        const user = await Users.findById(
            {
                _id: "5fdc7fe473e30ec8dcf398f7",
            }
        );
        if (user.authorizationStatus == true) {
            await Users.findOneAndUpdate(
                {_id: user._id},
                {$set: {authorizationStatus: false}},
                {new: true}
            );
            res.status(200).json({
                message: `Пользователь ${user.name}, разлогинен!`
            });

        } else if (user.authorizationStatus == true) {
            res.status(209).json({
                message: "Ошибка. Данный пользователь уже разлогинен..."
            });
        }

    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = async (req, res) => {
    // email password

    const candidate = await Users.findOne({login: req.body.login});
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

        try {
            await user.save().then(() => {
                res.status(201).json(user)
            });
        } catch (error) {
            errorHandler(res, error);
        }
    }
}

//получить всех пользователей выбранной компании
module.exports.getAll = async (req, res) => {
    try {
        const users = await Users.find(
            {
                companyId: req.params.companyId
            }
        );
        res.status(200).json(users);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    await console.log("req+body: ", req.body);
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
        errorHandler(res, error);
    }
}
