const express = require('express');
const router = express.Router();
// const passport = require('passport');
const controller = require('./../../controllers/god/godNotificationsController');

  // доступ с валидным jwt + доступ со (status:3)+
router.get('/:id',           controller.getById); //получение данных конкретной Notification по полю ( _id )
router.post('/',             controller.create);  //создание Notification для текущей Company
router.patch('/:id',         controller.update);  //редактирование Notification по полю ( _id )
router.delete('/:id',        controller.remove);  //удаление Notification по полю ( _id )


module.exports = router;