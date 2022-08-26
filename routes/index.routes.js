const router = require("express").Router();
const authRoutes = require ('./auth.routes')
const userRoutes = require ('./user.routes')
const costRoutes = require ('./cost.routes.js')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth", authRoutes)
router.use("/user",userRoutes)
router.use('/cost',costRoutes)

module.exports = router;
