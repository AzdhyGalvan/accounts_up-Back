const router = require("express").Router();
const authRoutes = require ('./auth.routes')
const userRoutes = require ('./user.routes')
const costRoutes = require ('./cost.routes.js')
const saleRoutes = require ('./sales.routes')
const pursacheRoutes = require ('./pursache.routes')
const resultsRoutes = require ('./results.routes')
const uploadRoutes = require ('./upload.routes')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth", authRoutes)
router.use("/user",userRoutes)
router.use('/cost',costRoutes)
router.use('/sale',saleRoutes)
router.use('/pursache',pursacheRoutes)
router.use('/results',resultsRoutes)
router.use('/upload',uploadRoutes)

module.exports = router;
