const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/god/godVideosController');
                  // доступ с валидным jwt +
router.get('/',                                 controller.getAll);  //выборка по полю (cameraId) ограничение по полю (companyId) jwt токена
router.get('/:id',                              controller.getById); //получение данных конкретного Video по полю ( _id ),ограничение по полю (companyId) jwt токена
router.patch('/:id',                            controller.update);
// router.get('/createTest',                              controller.createTest);
router.post('/',                                controller.create);  //доступ со (status:2), создание Video c полем (companyId) jwt токена
router.delete('/:id',                           controller.remove);  //доступ со (status:2) и удаление по ( _id ) ограничение по полю (companyId) jwt токена
router.delete('/removeEmptyRecords/:cameraId',  controller.removeEmptyRecords);

module.exports = router;