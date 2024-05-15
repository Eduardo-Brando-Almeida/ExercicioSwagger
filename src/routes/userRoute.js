const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController');

router.get('/user', userController.getUser);
router.post('/user', userController.create);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete)
router.get('/user/:id', userController.details);

module.exports = router;
