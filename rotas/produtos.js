import express from 'express';

import dados from '../data/produtos.js';

const router = express.Router();

function verificarProdutoExiste(req, res, next) {

    const { id } = req.params;

    const index = dados.findIndex((produto) => produto.id == id);

    if (index < 0) {
        return res.status(404).json({
            erro: "Produto não encontrado!"
        });
    }

    req.id = id;
    req.index = index;

    return next();
}

router.get('/', (req, res) => {

    res.json(dados);

});

router.post('/', (req, res) => {

    const { id, nome, descricao, imagem } = req.body;

    if (!id || !nome || !descricao || !imagem) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    const existeProduto = dados.some((produto) => produto.id == id);

    if (existeProduto) {
        return res.status(400).json({
            erro: "Produto já cadastrado!"
        });
    }

    const novoProduto = {
        id: Number(id),
        nome,
        descricao,
        imagem
    };

    dados.push(novoProduto);

    res.status(201).json(novoProduto);

});

router.put('/:id', verificarProdutoExiste, (req, res) => {

    const { nome, descricao, imagem } = req.body;

    const index = req.index;

    dados[index] = {
        ...dados[index],

        nome: nome !== undefined
            ? nome
            : dados[index].nome,

        descricao: descricao !== undefined
            ? descricao
            : dados[index].descricao,

        imagem: imagem !== undefined
            ? imagem
            : dados[index].imagem
    };

    res.status(200).json(dados[index]);

});

router.delete('/:id', verificarProdutoExiste, (req, res) => {
    const index = req.index;
    const id = req.id;
    dados.splice(index, 1);
    res.status(200).json({
        mensagem: `Produto com ID ${id} deletado com sucesso!`
    });

});

export default router;