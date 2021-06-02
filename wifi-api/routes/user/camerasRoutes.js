const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/camerasController');
                  // доступ с валидным jwt +
router.get('/all/:objectId', controller.getAll);  //выборка по полю (transportId) ограничение по полю (objectId)
router.get('/:id' ,          controller.getById); //получение данных конкретной Camera по полю ( _id ),ограничение по полю (companyId) jwt токена
router.post('/',       passport.authenticate('jwt', {session:false}), controller.create);  //доступ со (status:2), создание Camera c полем (companyId) jwt токена
router.patch('/:id',   passport.authenticate('jwt', {session:false}), controller.update);  //доступ со (status:2) и редактирование по ( _id ) ограничение по полю (companyId) jwt токена
router.delete('/:id',  passport.authenticate('jwt', {session:false}), controller.remove);  //доступ со (status:2) и удаление по ( _id ) ограничение по полю (companyId) jwt токена

module.exports = router;

