const router = require ('express').Router()
const {createSale, editSale,deleteSale} = require ('../controllers/sales.controller')
const {verifyToken} = require ('../middleware')


router.post('/create-sale',verifyToken,createSale)
router.patch('/edit-sale/:_id',verifyToken,editSale)
router.delete('/delete-sale/:_id',verifyToken,deleteSale)



module.exports = router;