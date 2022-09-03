const { Schema, model } = require("mongoose");

const pursacheModel = new Schema ({

    month: {
        type: String,
        require:true,
        enum:['Enero','Febrero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      },
      year: {
        type: String,
        require:true,
        enum:['2021','2022']
      },

payroll:{
    type:Number,
    require:false,
    default:0
},
taxes:{
    type:Number,
    require:true,
    default:0
},
ligth:{
    type:Number,
    require:false,
    default:0
},
phone:{
    type:Number,
    require:false,
    default:0
},
another:[
    {
        concepto:String,
        amount:Number
    }
],
  
_owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true
  
}




},{
    timestamps: true,
    strict:false
})

const Pursache = model("Pursache", pursacheModel);

module.exports = Pursache;