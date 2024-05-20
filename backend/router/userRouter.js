const {Router} = require('express');
const router = Router();

const UserController = require('../controller/userController');
const userauthentication = require('../middleware/auth')

router.post('/addUser', UserController.insertusers);
router.post('/checkUser', UserController.checkusers);
router.get('/get-info', userauthentication.authenticate, UserController.getinfo);

module.exports = router;
