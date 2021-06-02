const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/god/godAuthoInjectController');

      // доступ с валидным jwt + доступ со (status:3)+
router.get('/skynetcompanycreate',  controller.skynetcompanycreate);  //создание Company IT-AM
router.get('/skynetusercreate',     controller.skynetusercreate);  //создание User выбранной Company

router.get('/skynetcompanyremove',  controller.skynetcompanyremove);  //создание Company IT-AM
router.get('/skynetuserremove',     controller.skynetuserremove);  //создание User выбранной Company


module.exports = router;