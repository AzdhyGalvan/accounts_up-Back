const router = require ('express').Router()
const  {createCost,editCost,deleteCost} = require ("../controllers/cost.controllers")

router.post("/create-cost",createCost)
router.patch("/edit-cost/:_id",editCost)
router.delete("/delete-cost/:_id",deleteCost)




module.exports = router;