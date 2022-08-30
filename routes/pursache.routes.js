const router = require ('express').Router()
const {createPursache,editPursache,deletePursache} = require ('../controllers/pursache.controller.js')
const {verifyToken} = require ('../middleware')

router.post('/create-pursache',verifyToken,createPursache)
router.patch('/edit-pursache/:_id',verifyToken,editPursache)
router.delete('/delete-pursache/:_id',verifyToken,deletePursache)

module.exports = router
