const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { clearRes, createJWT } = require("../utils/utils");

exports.signupProcess = async (req, res, next) => {
  const {role,email,password,confirmPassword,razonSocial,rfc,person,...restUser} = req.body;

  try{
    //validamos campos vacios
  if (!email.length ||!password.length ||!confirmPassword.length ||!razonSocial.length ||!rfc.length ||!person.length)
  return res
    .status(400).json({ errorMessage: "No debes mandar campos vacios!!!" });


//validar si el password > 8 o en una regla REGEX

const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
if (!regex.test(password)) {
  return res.status(400).json({
    errorMessage:
      "La contraeña debe contener min 8 caracteres, 1 mayuscula, 1 miniscula y 1 número.",
  });
}

//password coincide!
if (password != confirmPassword)
  return res
    .status(400)
    .json({ errorMessage: "Las contraseñas no son iguales" });
  
  

  //validacion del rfc
 const foundRFC = await User.findOne({ rfc  })
if (foundRFC) return res.status(400).json({ errorMessage: "Este RFC ya esta registrado" })

  //validacion de LA RAZON SOCIAL
const foundRS = await  User.findOne({ razonSocial })
if (foundRS)return res.status(400).json({ errorMessage: "Esta Razon Social ya esta registrado" })

  //validacion del email
  const foundEmail= await User.findOne({ email })
  if (foundEmail)return res.status(400).json({ errorMessage: "Ese correo ya fue  registrado" });


const salt = bcryptjs.genSaltSync(10);
const hashedPassword = bcryptjs.hashSync(password,salt);

       
   const user= await User.create ({email,password: hashedPassword,rfc,razonSocial,person,...restUser,})
              
         const [header, payload, signature] = createJWT(user);
            
            res.cookie("headload", `${header}.${payload}`, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
              sameSite: "strict",
              secure: false,
            });
            res.cookie("signature", signature, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
              sameSite: "strict",
              secure: false,
            });

            //vamos a limpiar la respuesta de mongoose CONVIERTIENDO el BSOn a objeto y eliminar data basura
            const newUser = clearRes(user.toObject());
            res.status(201).json({ user: newUser });  
}catch(error){

  if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });
  
  if (error.code === 11000) return res.status(400).json({ errorMessage: "El correo electronico ya esta en uso"});
  
  return res.status(500).json({ errorMessage: error.message });
}
}

exports.loginProcess = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.length || !password.length)
    return res
      .status(400)
      .json({ errorMessage: "No debes mandar campos vacios" });

  //validar la contraseña que contenga 8 caracteres o REDEX

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json({
      errorMessage: "Datos incorrectos,revisa tu correo y contraseña",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ errorMessage: "Credenciales invalidas" });

      //validar que la contraseña sea correcta
      return bcryptjs.compare(password, user.password).then((match) => {
        if (!match)
          return res
            .status(400)
            .json({ errorMessage: "Credenciales invalidas" });

        //crear nuestro jwt

        const [header, payload, signature] = createJWT(user);

        res.cookie("headload", `${header}.${payload}`, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });
        res.cookie("signature", signature, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });

        //vamos a limpiar el response del usuario

        const newUser = clearRes(user.toObject());
        res.status(200).json({ user: newUser });
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "el segundo error",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.logoutProcess = (req, res, next) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res.status(200).json({ successMessage: "Bye,Te esperamos pronto :D" });
};
