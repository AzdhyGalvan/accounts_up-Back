const { Schema, model } = require("mongoose");

const salesSchema = new Schema(
  {
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

    client: {
      type: String,
      require:true
    },
    amount: { //importe
      type: Number, 
      require: true,
     
    },
    _owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
      require:true
    
  }
  },
  {
    
    timestamps: true,
  }
);

const Sales = model("Sales", salesSchema);

module.exports = Sales;