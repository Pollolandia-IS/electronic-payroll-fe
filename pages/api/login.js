import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '/.db';


export default function handler (req, res) {
  if (req.method == "POST") {
    handleLogin(req, res);
  }
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const userData = await getUserData(email);
  console.log(userData);
  if (userData) {
    if (userData.verified) {
      sendResponse({email: userData.email, verified: userData.verified, isEmployer: userData.isEmployer ,name: userData.name,}, res, password === userData.password);
    }
    else {
      res.status(401).json({type: -2, error: 'Debes confirmar tu correo' })
    }
  }
  else {
    res.status(401).json({type: -1, error: 'Usuario y/o contraseña incorrectos' }); //invalid email
  }
}

const sendResponse = async (userData, res, isValid) => {
  if (isValid) {
    const token = jwt.sign({ userData }, process.env.JWT_SECRET);
    res.status(200).json({type:1, token});
  }
  else {
    res.status(401).json({type: -1, error: 'Usuario y/o contraseña incorrectos' });
  }
}

const getUserData = async (email) => {
  const user = await prisma.credenciales.findUnique({
    where: {
      email: email,
    },
    include: {
      hace_uso: true,
    },
  })
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
      empleador: true,
    },
  })
  const userData = {
    email: user.email,
    password: user.contrasenna,
    verified: user.verificado,
    isEmployer: person.empleador != null,
    name: person.nombre,
  }
  return userData;
}
