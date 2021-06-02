const Camera = require('../../models/Cameras');
const Videos = require('../../models/Videos');
const { exec } = require("child_process");

const FS = require('fs');
const keys = require('../../config/keys-api');
const errorHandler = require('./../../utils/errorHandler');

// =====================CAMERA====================
module.exports.create = async (req, res) => {

    try {
        //проверка на существование камеры
        const candidate = await Camera.findOne(
            {
                numberCamera: req.body.numberCamera,
            }
        );
        if (candidate) {
            res.status(404).json("Эта камера уже зарегистрированна")
        } else {

            const newCamera = await new Camera(
                {
                    companyId: req.body.companyId,
                    objectId: req.body.objectId,
                    nameCamera: req.body.nameCamera,
                    numberCamera: req.body.numberCamera,
                    latestVideoId: "2021-03-09 00:00:00"
                }
            ).save();
            res.status(201).json(newCamera);

        }
    } catch (error) {
        // res.status(500).json("Ошибка сервера, камера не зарегистрированна...");
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const camera = await Camera.findById(
            {
                _id: req.params.id,
            }
        );
        await console.log("camera getById :", camera);
        res.status(200).json(camera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        // получаем требуемую камеру по влетевшему id
        const candidatCamera = await Camera.find(
            {
                _id: req.params.id
            }
        );
        await console.log("Кандидат :", candidatCamera);
        // сравнение companyId для переадрессации архивных видео
        let updatedCamera = {};
        if (candidatCamera.companyId == req.body.companyId) {
            await console.log("Не менять компанию :", req.body);
            updatedCamera = await Camera.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $set:
                        {
                            objectId: req.body.objectId,
                            companyId: req.body.companyId,
                        }
                },
                {new: true}
            );
        } else if (candidatCamera.companyId != req.body.companyId) {
            await console.log("Менять компанию :", req.body);
            updatedCamera = await Camera.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $set:
                        {
                            objectId: req.body.objectId,
                            companyId: req.body.companyId,
                        }
                },
                {new: true}
            );
            //получение связанных архивных видео с переадрессуеммой камеры и изменение их companyId
            const cameras = await Camera.find(
                {
                    cameraId: req.params.id
                }
            );

            // cameras.forEach(camera => {
            //     Videos.findOneAndUpdate(
            //         {_id: camera._id},
            //         {$set: req.body},
            //         {new: true}
            //     );
            // })

        }
        res.status(200).json(updatedCamera);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        // получение записи удаляемой камеры
        const camera = await Camera.findById(
            {
                _id: req.params.id,
            }
        );
        //получение записей видеофайлов связанных с камерой
        let listVideosForRemoved = await Videos.find(
            {
                cameraId: req.params.id
            }
        );
        //построение командной строки удаления директории содержащей файлы камеры
        let comandString = `cd ${keys.fileStorage};  rm -rf ${camera.numberCamera}`;
        // удаление директории с файлами
        exec(comandString, (error, stdout, stderr) => {
            if (error) {
                console.log(`exec error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`exec stderr: ${stderr}`);
                return;
            }
            console.log(`exec stdout: ${stdout}`);
        });
        //удаление записей видеофайлов относящихся к камере
        await Videos.remove({cameraId: req.params.id});
        //удаление записи камеры
        await Camera.remove({_id: req.params.id});

        res.status(200).json({message: "Камера удалена из списка камер текущего объекта вместе с архивами."});
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const cameras = await Camera.find();
        res.status(200).json(cameras);
    } catch (error) {
        errorHandler(res, error);
    }
}