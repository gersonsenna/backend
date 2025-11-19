const Usuario = require("../models/usuariosModel");
const jwt = require("jsonwebtoken");

async function criar(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }

  const usuario = await Usuario.create({ email, senha });
  return res.status(201).json(usuario);
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const usuario = await Usuario.findOne({ email, senha });

  if (!usuario) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ token });
}

async function renovar(req, res) {
  const token = jwt.sign({ id: req.usuarioId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ token });
}

async function remover(req, res) {
  await Usuario.findOneAndDelete({ _id: req.params.id });
  return res.status(204).send();
}

module.exports = {
  criar,
  login,
  renovar,
  remover
};
