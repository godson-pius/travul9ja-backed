const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const { AuthWare } = require('../middleware/AuthWare')

//= Get all buses
router.get('/', AuthWare, paymentController.getAllPayment)
router.get('/:id', AuthWare, paymentController.getSinglePayment)
router.get('/user/:userId', AuthWare, paymentController.getUserPayment)
router.post('/', AuthWare, paymentController.makePayment)


module.exports = router