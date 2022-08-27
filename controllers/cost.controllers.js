const Cost = require ('../models/Costs.model')
const mongoose = require('mongoose')


exports.createCost = (req,res,next) =>{
    const {month,year,supplier, amount}= req.body

    Cost.create({month,year,supplier, amount})
    .then(costs=>{
        res.status(201).json({ costs });
        console.log("que es mi cost",costs)
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "Error al crear un costo",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });

}

exports.editCost = (req,res,next) =>{

  const {_id} =req.params

  Cost.findByIdAndUpdate(_id,{...req.body},{new:true})
  .then(cost=>{
        res.status(200).json(cost)
       
  })

  .catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Error al editar un costo"
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 

}

exports.deleteCost = (req,res,next)=>{

  const {_id} = req.params

  Cost.findByIdAndDelete(_id)
  .then(()=>{
    res.status(200).json({successMessage:`El costo con registro ${_id} ha sido removido`})
  })
}
