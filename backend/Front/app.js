// App.js (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produtos').then(res => setProdutos(res.data));
    axios.get('http://localhost:3002/clientes').then(res => setClientes(res.data));
    axios.get('http://localhost:8080/vendas').then(res => setVendas(res.data));
  }, []);

  return (
    <div>
      <h1>Controle de Vendas</h1>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto._id}>{produto.nome} - {produto.valor}</li>
        ))}
      </ul>
      
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente._id}>{cliente.nome} - {cliente.telefone}</li>
        ))}
      </ul>

      <h2>Vendas</h2>
      <ul>
        {vendas.map((venda, index) => (
          <li key={index}>{venda}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
