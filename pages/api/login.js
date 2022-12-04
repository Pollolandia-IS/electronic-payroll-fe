import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "/.db";

export default function handler(req, res) {
  if (req.method == "POST") {
    handleLogin(req, res);
  }
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  // verify email follows the correct format and length < 100
  const isValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && email.length <= 100;
  if (!isValid) {
    res.status(422).json({ type: -3, error: "Formato de correo inválido" });
    return;
  }

  const userData = await getUserData(email);
  if (userData) {
    sendResponse(
      { isEmployer: userData.isEmployer, name: userData.name, email: userData.email, id: userData.id, companyId: userData.companyId },
      res,
      password === userData.password,
      userData.verified
    );
  } else {
    res
      .status(401)
      .json({ type: -1, error: "Usuario y/o contraseña incorrectos" }); //invalid email
  }
};

const sendResponse = async (userData, res, isValid, verified) => {
  if (isValid) {
    if (verified) {
      const token = jwt.sign({ userData }, process.env.JWT_SECRET);
      res.status(200).json({ type: 1, token });
    } else {
      res.status(401).json({ type: -2, error: "Debes confirmar tu correo" });
    }
  } else {
    res
      .status(401)
      .json({ type: -1, error: "Usuario y/o contraseña incorrectos" });
  }
};

const getUserData = async (email) => {
  const user = await prisma.credenciales.findUnique({
    where: {
      email: email,
    },
    include: {
      hace_uso: true,
    },
  });
  if (!user) {
    return null;
  }
  const id = user.hace_uso[0].cedula;
  const person = await prisma.persona.findUnique({
    where: {
      cedula: id,
    },
    include: {
      empleado: true,
      empleador: {
        include: {
          empresa: {
            select: {
              cedulaJuridica: true,
            },
          },
          }
        },
      },
  });
 
  const userData = {
    email: user.email,
    password: user.contrasenna,
    verified: user.verificado,
    isEmployer: person.empleador != null,
    name: person.nombre,
    id: person.cedula,
    companyId: person.empleador != null ? person.empleador.empresa[0] ? person.empleador.empresa[0].cedulaJuridica : null : person.empleado.cedulaJuridica,
  };

  return userData;
};
