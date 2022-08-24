const { Schema, model } = require("mongoose");

const sellSchema = new Schema(
  {
    month: {
      type: String,
      require:true
    },
    totalSell: {
      type: Number,
      require:true
    },
    concentrate: {
      type: String, //AQUI IRIA LA CARGA DE ARCHIVOS EN EXCEL
      require: true,
     
    },
  },
  {
    
    timestamps: true,
  }
);

const Sell = model("Sell", sellSchema);

module.exports = Sell;
