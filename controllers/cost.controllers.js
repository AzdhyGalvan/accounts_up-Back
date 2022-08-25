const Cost = require ('../models/Costs.model')
const mongoose = require('mongoose')


exports.createCost = (req,res,next) =>{
    const {cost}= req.body

    Cost.create(cost)
    .then(costs=>{
        res.status(201).json({ costs });
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "el segundo error",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });


}

