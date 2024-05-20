const {Router} = require('express');
const router = Router();

const mailController = require('../controller/mailController');
const userauthentication = require('../middleware/auth')

router.post('/sent-mail', userauthentication.authenticate,mailController.addmail);
router.get('/get-mail', userauthentication.authenticate,mailController.receivedmail );
router.put('/mark-read/:id', mailController.markedmail );
router.delete('/deletemail/:id', mailController.deletemail );
router.post('/star_mail/:id', mailController.starmail);
router.get('/get-sent-mail', userauthentication.authenticate,mailController.sentmail );
router.get('/get-star-mail', userauthentication.authenticate,mailController.getstarmail );

module.exports = router;
