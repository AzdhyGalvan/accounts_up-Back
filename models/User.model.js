const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    razonSocial: {
      type: String,
      unique: true,
      require:true
    },
    rfc: {
      type: String,
      unique: true,
      require:true
    },
    fiscalAdress: {
      type: String,
      unique: true,
      require:false
    },
    email: {
      type: String,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Ingresa un correo valido."],
      trin: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    password:{
      type:String,
      require:true,
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
