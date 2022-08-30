const Pursache = require ('../models/Pursache.model')
const mongoose = require ('mongoose');



exports.createPursache = (req,res,next)=>{

    const {month,year,payroll,taxes,ligth,phone,another} = req.body
    const {_id:_owner} = req.user //_owner => al _id del usuario

    Pursache.create({_owner,month,year,payroll,taxes,ligth,phone,another})
    .then(pursache =>{
        res.status(201).json({pursache})
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "Error al crear un gasto",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
}

exports.editPursache = (req,res,next)=>{

const {_id} = req.params
 Pursache.findOneAndUpdate({_id,_owner:req.user._id},{...req.body},{new:true})
.then(pursache=>{
    res.status(200).json(pursache)
})
.catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Error al editar un gasto"
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 

}

exports.deletePursache = (req,res,next) =>{

    const {_id} = req.params

    Pursache.findByIdAndDelete({_id,owner:req.user._id})
    .then(()=>{
        res.status(200).json({successMesage:`El gasto con referencia ${_id} ha sido removido`})
    })

}