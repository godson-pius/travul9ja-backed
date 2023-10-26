const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUsers).post('/', userController.createUser)
router.get('/:id', userController.getUser).put('/:id', userController.updateUser).delete('/:id', userController.deleteUser)
router.post('/login', userController.login)

module.exports = router