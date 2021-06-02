const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./../../controllers/god/godUsersController');

      // доступ с валидным jwt + доступ со (status:3)+
router.get('/',         controller.getAll); //получение всех User системы
router.post('/jwt',     controller.jwt);   //(доступ без jwt) проверка логина\пароля и выдача jwt токена с контрольными данными пользователя
router.get('/login',    passport.authenticate('jwt', {session:false}), controller.login); //получение данных авторизованного User по полю ( _id ) jwt токена
router.get('/:id',      controller.getById); //получение данных конкретного User по полю ( _id )
router.post('/',        controller.create);  //создание User выбранной Company
router.patch('/:id',    controller.update);  //редактирование User по полю ( _id )
router.delete('/:id',   controller.remove);  //удаление User по полю ( _id )

module.exports = router;