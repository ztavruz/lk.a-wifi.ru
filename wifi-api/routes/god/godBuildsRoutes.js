const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./../../controllers/god/godBuildsController');

 // доступ с валидным jwt + доступ со (status:3)+
router.get('/:id',              controller.getById);       //получение данных конкретного Transport по полю ( _id )
router.post('/',                controller.create);        //создание Transport выбранной Company
router.patch('/:id',            controller.update);        //редактирование Transport по полю ( _id )
router.delete('/:id',           controller.remove);        //удаление Transport по полю ( _id ), а также удаление всех Camera по полю (companyId) равное ( _id ) удаляемого Transport
router.get('/cameras/:id',      controller.getAllCamera);  //получение всех Cameras транспорта по ( _id )

router.get('/',                 controller.getAll); //получение всех Transport системы
module.exports = router;