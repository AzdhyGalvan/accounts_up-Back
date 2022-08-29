const User = require ("../models/User.model")
const { clearRes } = require("../utils/utils")
const  mongoose = require ('mongoose')


exports.getLoggedUser = (req,res,next)=>{
    res.status(200).json({user:req.user})
}

exports.editProfile = (req,res,next)=>{
    const {role,password,rfc,razonSocial,person,email, ...restUser} = req.body
    //voy a destructurar del req.user ={_id}
    const {_id} = req.user
    User.findByIdAndUpdate(_id, {...restUser},{new:true})
    .then(user=>{
        const newUser = clearRes(user.toObject())
        res.status(200).json({user:newUser})

    })
    .catch(error=>{
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMessage: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
              errorMessage: "el correo electronico ya esta en uso ooo."
            })
          }
          return res.status(500).json({ errorMessage: error.message });
        }) 
    

}

exports.getUserById = (req,res,next) =>{
  const {id} = req.params;

  User.findById(id)
  .then(user=>{
    const newUser = clearRes(user.toObject())
    res.status(200).json({user:newUser})

  })
  .catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "el correo electronico ya esta en uso iiii."
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 


}

//esta es para el admin
 exports.onlyAdminRead=(req,res,next)=>{

  User.find({ role: {$ne:'Admin'} },{password:0,__v:0,createdAt:0,updatedAt:0})
  .then(users=>{
    res.status(200).json({users})
  })
  .catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "el correo electronico ya esta en uso uuuu."
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 
 }

 //borrar la cuenta del usuario loggeado
 exports.deleteAccount = (req,res,next)=>{
  //destruccturamos el req.user
  const {_id} = req.user
  User.findByIdAndRemove(_id)
  .then(()=>{
    res.clearCookie('headload');
    res.clearCookie('signature')
    res.status(200).json({successMessage:'Ususario borrado'})
  })
  .catch(error=>{
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "el correo electronico ya esta en uso aaaa."
        })
      }
      return res.status(500).json({ errorMessage: error.message });
    }) 
 }