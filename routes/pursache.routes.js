const router = require ('express').Router()
const {createPursache,editPursache,deletePursache} = require ('../controllers/pursache.controller.js')

router.post('/create-pursache',createPursache)
router.patch('/edit-pursache/:_id',editPursache)
router.delete('/delete-pursache/:_id',deletePursache)

module.exports = router
