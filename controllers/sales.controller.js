const Sale = require ('../models/Sales.model')
const mongoose = require ('mongoose');
const Cost = require('../models/Costs.model');


exports.createSale = (req,res,next)=>{

const {month,year,client,amount} = req.body
const {_id:_owner} = req.user //_owner => al _id del usuario

Sale.create({_owner,month,year,client,amount})
.then(sales =>{
    res.status(201).json({sales});
})
.catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "Error al crear una venta",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  });
}


exports.editSale = (req,res,next)=>{
const {_id} = req.params

Sale.findOneAndUpdate({_id,_owner:req.user._id},{...req.body},{new:true})
.then (sale=>{
    res.status(200).json(sale)
})
.catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Error al editar una venta"
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 

}


exports.deleteSale = (req,res,next) =>{

    const {_id} = req.params

   Sale.findOneAndDelete({_id,_owner:req.user._id})
    .then(()=>{
        res.status(200).json({successMessage:` La venta con resgistro ${_id} ha sido removida`})
    })

}