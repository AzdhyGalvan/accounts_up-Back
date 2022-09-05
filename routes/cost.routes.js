const router = require ('express').Router()
const { verify } = require('jsonwebtoken')
const  {createCost,editCost,deleteCost} = require ("../controllers/cost.controllers")
const {verifyToken} = require ('../middleware')

router.post("/create-cost",verifyToken,createCost)
router.patch("/edit-cost/:_id",verifyToken,editCost)
router.delete("/delete-cost/:_id",verifyToken,deleteCost)




module.exports = router;