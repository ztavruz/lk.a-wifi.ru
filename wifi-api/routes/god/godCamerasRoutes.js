const express = require('express');
const router = express.Router();
// const passport = require('passport');
const controller = require('./../../controllers/god/godCamerasController');

   // доступ с валидным jwt + доступ со (status:3)+
router.get('/:id',           controller.getById); //получение данных конкретной Camera по полю ( _id )
router.post('/',             controller.create);  //создание Camera текущего Transport
router.patch('/:id',         controller.update);  //редактирование Camera по полю ( _id )
router.delete('/:id',        controller.remove);  //удаление Camera по полю ( _id )

router.get('/',              controller.getAll); //получение всех Camera системы

module.exports = router;