const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/mailController');

router.post('/euranews',                    controller.messageFromEuronews);
router.post('/pleaseregistertransport',     controller.messageFromLK);

//              доступ с валидным jwt +
// passport.authenticate('jwt', {session:false}),

// router.get('/',         controller.getAll);
// router.get('/:id',      controller.getById);
// router.post('/search',  controller.searchByField);
// router.patch('/:id',    controller.update);
// router.delete('/:id',   controller.remove);

module.exports = router;