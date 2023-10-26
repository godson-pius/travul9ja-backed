const router = require('express').Router()
const busController = require('../controllers/busController')
const { AuthWare } = require('../middleware/AuthWare')

//= Get all buses
router.get('/', AuthWare, busController.getAllBus)

//= Get single bus
router.get('/:id', AuthWare, busController.getBus)

//= Add bus to system by agency
router.post('/', AuthWare, busController.addBus)

//= Get buses belonging to an agency
router.get('/agency/:id', busController.getAgencyBus)

module.exports = router