import express from 'express'
import dados from '../data/cardapio.js'

const router = express.Router();
function verificarItemExiste(req, res, next){

    const {id} = req.params;
    const index = dados.findIndex((item) => item.id == id);

    if (index <0){
        return res.status(404).json({erro:"item do cardápio não encontrado!"});
    }
    req.id = id
    req.index = index;

    return next ();

}
   
router.get('/', (req, res)=> {
    res.json(dados)
});

router.post('/', (req, res)=> {
    const {id, nome, descricao, img} = req.body

    if (!id || !nome || !descrição || !img){
        return res.status(400).json({erro:"Todos os campos são obriagtórios"});
    }

    const existeItem = dados.some(item => item.id == id);
    if(existeItem){
        return res.status(400).json({erro:"Cadastro já existente!"});
    }

    const novoItem = {
        id: Number(id),
        nome,
        descrição,
        img
    };

    dados.push(novoItem);

    res.status(201).json(dados)
});

router.put('/:id', verificarItemExiste, (req, res)=>{
    const {nome, descrição, img} = req.body
    const index = req.index

    dados[index] = {
        ...dados[index],
        nome: nome !== undefined ? nome: dados[index].nome,
        descrição: descrição !== undefined ? descrição: dados[index].descrição,
        img: img !== undefined ? img: dados[index].img
    }

    res.status(200).json(dados[index])
})

router.delete('/:id', verificarItemExiste, (req, res)=>{
const index = req.index
    const id = req.id
    dados.splice(index, 1);
    res.status(204).json({mensagem:`Item com ID${id} deletado com sucesso!`});
    
});

export default router;