const mongoose = require("mongoose");
const Produtos = require("../models/produtosModel");

async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await Produtos.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (err) {
    if (err.errors)
      return res
        .status(422)
        .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produtos.find({});
  return res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: "Parâmetro inválido" });
    const produtoEncontrado = await Produtos.findOne({ _id: id });
    req.produto = produtoEncontrado;
    if (!produtoEncontrado)
      return res.status(404).json({ msg: "Produto não encontrado" });
    next();
  } catch (err) {}
}

async function exibir(req, res) {
  res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const produtoAtualizado = await Produtos.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch (err) {
    if (err.errors)
      return res
        .status(422)
        .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function remover(req, res) {
  const { id } = req.params;
  const produtoRemovido = await Produtos.findOneAndDelete({ _id: id });
  res.status(204).end();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover };