// app.js (Node.js com Express)
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

mongoose.connect('mongodb://mongodb:27017/produtos', { useNewUrlParser: true, useUnifiedTopology: true });

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  valor: Number,
});

const Produto = mongoose.model('Produto', ProdutoSchema);

app.use(express.json());

app.post('/produtos', async (req, res) => {
  const { nome, descricao, valor } = req.body;
  const produto = new Produto({ nome, descricao, valor });
  await produto.save();
  res.status(201).send(produto);
});

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find();
  res.status(200).json(produtos);
});

app.listen(PORT, () => {
  console.log(`Microserviço de produtos rodando na porta ${PORT}`);
});
