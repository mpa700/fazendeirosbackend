const express = require('express');
const { Service } = require('./services.js');

const router = express.Router();
const service = new Service();

router.get('/produtores', async (req, res) => {
  try {
    const produtores = await service.obterProdutoresRurais();
    res.json(produtores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/produtores', async (req, res) => {
  const produtor = req.body; // Assume que o corpo da requisição contém dados do produtor
  try {
    const novoProdutor = await service.criarProdutorRural(produtor);
    res.json(novoProdutor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produtor' });
  }
});

router.get('/produtores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produtor = await service.obterProdutorRural(id);
    res.json(produtor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produtor' });
  }
});

router.put('/produtores/:id', async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body; // Assume que o corpo da requisição contém dados atualizados do produtor
  try {
    const produtorAtualizado = await service.atualizarProdutorRural(id, dadosAtualizados);
    res.json(produtorAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produtor' });
  }
});

router.delete('/produtores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await service.removerProdutorRural(id);
    res.json({ message: 'Produtor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover produtor' });
  }
});

module.exports = router;
