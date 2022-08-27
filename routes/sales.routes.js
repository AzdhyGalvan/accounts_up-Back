const router = require ('express').Router()
const {createSale, editSale,deleteSale} = require ('../controllers/sales.controller')

router.post('/create-sale',createSale)
router.patch('/edit-sale/:_id',editSale)
router.delete('/delete-sale/:_id',deleteSale)



module.exports = router;