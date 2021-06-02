const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user/companyController');

router.get('/',   passport.authenticate('jwt', {session:false}), controller.getById); // + по companyId jwt токена
router.patch('/id',  passport.authenticate('jwt', {session:false}), controller.update);  // + проверка на админа(status:2) jwt токена

module.exports = router;