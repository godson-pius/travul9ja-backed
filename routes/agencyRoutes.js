const router = require('express').Router();
const agencyController = require('../controllers/agencyController')

router.get('/', agencyController.getAgencies).post('/', agencyController.createAgency)
router.get('/:id', agencyController.getAgency).put('/:id', agencyController.updateAgency).delete('/:id', agencyController.deleteAgency);
router.post('/login', agencyController.login)

module.exports = router