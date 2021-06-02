const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/buildsController');
                    // доступ с валидным jwt +
router.get('/',        passport.authenticate('jwt', {session:false}), controller.getAll);  //выборка по полю (companyId) jwt токена
router.get('/:id',     passport.authenticate('jwt', {session:false}), controller.getById); //получение данных конкретного Transport по полю ( _id ),ограничение по полю (companyId) jwt токена
router.post('/search', passport.authenticate('jwt', {session:false}), controller.searchByField);
router.patch('/:id',   passport.authenticate('jwt', {session:false}), controller.update);  //доступ со (status:2) и редактирование по ( _id ) ограничение по полю (companyId) jwt токена
router.delete('/:id',  passport.authenticate('jwt', {session:false}), controller.remove);  //доступ со (status:2) и удаление по ( _id ) ограничение по полю (companyId) jwt токена

module.exports = router;