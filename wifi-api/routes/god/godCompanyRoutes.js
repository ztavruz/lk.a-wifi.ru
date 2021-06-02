const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./../../controllers/god/godCompanyController');

                        // доступ с валидным jwt + доступ со (status:3)+
router.get('/',                     controller.getAll);              //выборка всех имеющихся Company
router.get('/:id',                  controller.getById);             //получение данных конкретной Company по полю ( _id )
router.post('/',                    controller.create);              //создание Company
router.patch('/:id',                controller.update);              //редактирование Company по полю ( _id )
router.delete('/:id',               controller.remove);              //удаление Company по полю ( _id ), а также удаление всех Users,Notifications,Transports,Cameras по полю (companyId) равное ( _id ) удаляемой Company
router.get('/users/:id',            controller.getAllUsers);         //выборка всех Users по полю (companyId)
router.get('/transports/:id',       controller.getAllTransports);    //выборка всех Transports по полю (companyId)
router.get('/builds/:id',           controller.getAllBuilds);        //выборка всех Builds по полю (companyId)
router.get('/notifications/:id',    controller.getAllNotifications); //выборка всех Notifications по полю (companyId)

module.exports = router;