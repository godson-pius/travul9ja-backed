const router = require('express').Router()
const bookingController = require('../controllers/bookingController')
const { AuthWare } = require('../middleware/AuthWare')

router.post('/', AuthWare, bookingController.bookBus)
router.get('/', AuthWare, bookingController.getBookings)
router.delete('/:id', AuthWare, bookingController.deleteBooking)

module.exports = router