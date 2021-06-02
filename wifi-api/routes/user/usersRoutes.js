const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/usersController');

                    // доступ с валидным jwt +
router.post('/jwt',     controller.jwt);   //(доступ без jwt) проверка логина\пароля и выдача jwt токена с контрольными данными пользователя
router.get('/login',    passport.authenticate('jwt', {session:false}), controller.login);   //получение данных авторизованного User по полю ( _id ) jwt токена
router.get('/logout',   passport.authenticate('jwt', {session:false}), controller.logout);  //Сброс статуса авторизации
router.post('/',        passport.authenticate('jwt', {session:false}), controller.create);  //доступ со (status:2), создание User c ограничением прав (status:1 - 2)
router.get('/',         passport.authenticate('jwt', {session:false}), controller.getAll);  //доступ со (status:2) и выборка по полю (companyId) jwt токена
router.patch('/:id',    passport.authenticate('jwt', {session:false}), controller.update);  //доступ со (status:2) и редактирование по ( _id ) ограничение по полю (companyId) jwt токена
router.delete('/:id',   passport.authenticate('jwt', {session:false}), controller.remove);  //доступ со (status:2) и удаление по ( _id ) ограничение по полю (companyId) jwt токена

router.get('/logouttest',  controller.logouttest);  //Сброс статуса авторизации


module.exports = router;