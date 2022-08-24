const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { clearRes, createJWT } = require("../utils/utils");


exports.signupProcess = (req, res, next) => {

  const { role, email, password, confirmPassword, razonSocial,rfc, ...restUser } = req.body;

  //validamos campos vacios
  if (!email.length || !password.length || !confirmPassword.length || !razonSocial.length || !rfc.length)
    return res
      .status(400)
      .json({ errorMessage: "No debes mandar campos vacios!" });

  //validar si el password > 8 o en una regla REGEX
  
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "La contraeña debe contener min 8 caracteres, 1 mayuscula, 1 miniscula y 1 número.",
    });
  }
  

  //password coincide!
  if (password != confirmPassword)
    return res
      .status(400)
      .json({ errorMessage: "La contraseña no son iguales" });

  //validacion del email
  User.findOne({ email })
    .then((found) => {
      if (found)
        return res
          .status(400)
          .json({ errorMessage: "Ese correo ya fue  registrado" });

      return (
        bcryptjs
          .genSalt(10)
          .then((salt) => bcryptjs.hash(password, salt))
          .then((hashedPassword) => {
            //crearemos al nuevo usuario
            return User.create({
              email,
              password: hashedPassword,
              ...restUser,
            });
          })
          //then contiene al user ya con password hashed y guardar en la db
          .then((user) => {
            //regresamos al usuario para que entre a la pagina y ademas creamos su token de acceso
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
          })
      );
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "el correo electronico ya esta en uso.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.loginProcess = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.length || !password.length)
    return res
      .status(400)
      .json({ errorMessage: "No debes mandar campos vacios" });

  //validar la contraseña que contenga 8 caracteres o REDEX

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "La contraeña debe contener min 8 caracteres, 1 mayuscula, 1 miniscula y 1 número.",
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
          errorMessage: "el correo electronico ya esta en uso.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};


exports.logoutProcess= (req,res,next)=>{
    res.clearCookie("headload")
    res.clearCookie("signature")
    res.status(200).json({successMessage:"Bye,Te esperamos pronto :D"})
}