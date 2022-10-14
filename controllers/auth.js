const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUserCtrl = async (req, res = response) => {
  console.log(
    "🚀 ~ file: auth.js ~ line 4 ~ exports.createUserCtrl= ~ req",
    req.body
  );
  const {
    name,
    grade,
    specialty,
    administrativePermission,
    FLA,
    role,
    rut,
    password,
  } = req.body;

  try {
    const existUser = await User.findOne({
      rut,
    });

    if (existUser) return res.status(400).send("El usuario ya existe!");

    const salt = bcrypt.genSaltSync();
    const encryptPassword = bcrypt.hashSync(password, salt);

    await User.create({
      name,
      grade,
      specialty,
      administrativePermission,
      FLA,
      role,
      rut,
      encryptPassword,
    });

    res.status(201).json({
      ok: true,
      message: "User Created",
      name,
      grade,
      specialty,
      administrativePermission,
      FLA,
      role,
      rut,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Favor hablar con el administrador",
    });
  }
};

// const loginUserCtrl = async (req, res = response) => {
//   const { email: email1, password: password1 } = req.body;
//   console.log("Login", req.body);
//   try {
//     const usuario = await leeUsuarioByEmail(email1);
//     console.log("Login-usuario:", usuario);
//     if (!usuario) {
//       return res.status(400).json({
//         ok: false,
//         msg: "El usuario-constraseña no corresponden",
//       });
//     }
//     const { uid, name, password, email, direccion, rut, celular } = usuario;
//     //console.log("loginUsuario:", uid, password1, password, name, email);
//     const validPassword = bcrypt.compareSync(password1, password);
//     // console.log("loginUsuario-validPassword:", validPassword);

//     if (!validPassword) {
//       return res.status(400).json({
//         ok: false,
//         msg: "El usuario-constraseña no corresponden.",
//       });
//     }
//     //const name=nombres+' '+apellidos;
//     const token = await generarJWT(uid, email);
//     // console.log("loginUsuario-obtiene token:", uid, email, token);
//     res.json({
//       ok: true,
//       uid,
//       email,
//       name,
//       direccion,
//       rut,
//       celular,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Favor hablar con el administrador",
//     });
//   }
// };
