const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/notificationsController');

           // доступ с валидным jwt +
router.get('/', passport.authenticate('jwt', {session:false}),  controller.getAll); // выборка по полю (companyId) jwt токена

module.exports = router;