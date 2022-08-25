const { Schema, model } = require("mongoose");

const pursacheModel = new Schema ({

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
another:{
    type:Number,
    require:false,
    default:0
}

},{
    timestamps: true,
})

const Pursache = model("Pursache", pursacheModel);

module.exports = Pursache;