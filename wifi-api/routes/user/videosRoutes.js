const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/videosController');
// доступ с валидным jwt +
router.get('/all/:id', controller.getAll);  //выборка по полю (cameraId) ограничение по полю (companyId) jwt токена
// router.get('/:id',      controller.getById); //получение данных конкретного Video по полю ( _id ),ограничение по полю (companyId) jwt токена
router.get('/:filename', controller.getByFilename); //получение данных конкретного Video по полю ( _id ),ограничение по полю (companyId) jwt токена

router.post('/', controller.create);  //доступ со (status:2), создание Video c полем (companyId) jwt токена
router.post('/allbydate', controller.getAllByDate);  //доступ со (status:2), создание Video c полем (companyId) jwt токена
router.delete('/:id', controller.remove);  //доступ со (status:2) и удаление по ( _id ) ограничение по полю (companyId) jwt токена

module.exports = router;