const router = require ('express').Router()
const {allSales,allCost,allPursaches} = require('../controllers/results.controllers')
const {verifyToken} = require ('../middleware')


router.post('/results-sales',verifyToken,allSales)
router.post('/results-costs',verifyToken,allCost)
router.post('/results-pursaches',verifyToken,allPursaches)

module.exports = router;