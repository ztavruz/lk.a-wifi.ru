const fs = require('fs')
const Videos = require('../../models/Videos');
const errorHandler = require('../../utils/errorHandler');
const HELPER = require('./../../libs/helper');

const keys = require('../../config/keys-api');

module.exports.getAll = async (req, res) => {
    try {
        const listVideos = await Videos.find(
            {
                cameraId: req.params.id,
            }
        );
        res.status(200).json(listVideos);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getAllByDate = async (req, res) => {
    try {
        await console.info("cameraId: ", req.body.cameraId);

        let startVideo = await req.body.selectDate.replace(/"/g, '');
        await console.log("startVideo: ",startVideo);
        const listVideos = await Videos.find(
            {
                cameraId: req.body.cameraId,
                startVideo: {$regex: startVideo}

            }
        );
        await console.info("getAllByDateVideos: ", listVideos);
        await console.info("selectDate: ", req.body.selectDate);
        await console.info("selectDate: ", req.body);
        res.status(200).json(listVideos);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {

}

module.exports.getByFilename = async (req, res) => {

    let arrayPath = await HELPER.splitString(req.params.filename, "_");

    await console.log(arrayPath);

    const path = `${keys.fileStorage}/${arrayPath[0]}/${arrayPath[1]}/${arrayPath[2]}/${arrayPath[3]}/${arrayPath[4]}`;


    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range


    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

        if(start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
            return
        }

        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res);

        file.on('error', (err) => {
            res.statusCode = 500;
            res.end("Ошибка сервера");
            console.error(err);
        });
        file
            .on('open', () => {
                console.log("open");
            })
            .on('close', () => {
                console.log("close");
            })
        res.on('close', ()=>{
            file.destroy();
        })
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }

}

module.exports.create = async (req, res) => {
    try {
        const newVideo = await new Videos(
            {
                numberCamera: req.body.numberCamera,
                cameraId: req.body.cameraId,
                transportId: req.body.transportId,
                companyId: req.body.companyId,
            }
        ).save();
        res.status(201).json(newVideo);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Camera.remove({_id: req.params.id});
        res.status(200).json({message: "Видео удалено из архива транспорта компании."});
    } catch (error) {
        errorHandler(res, error);
    }
}