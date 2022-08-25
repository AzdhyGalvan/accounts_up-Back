const { Schema, model } = require("mongoose");

const costSchema = new Schema(
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

    supplier: { //Proveedores 
      type: String,
      require:true
    },
    amount: { //importe
      type: Number, 
      require: true,
     
    },
  },
  {
    
    timestamps: true,
  }
);

const Cost = model("Cost", costSchema);

module.exports = Cost;