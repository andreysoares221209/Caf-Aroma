import express from 'express';
import cors from 'cors';
import path from 'path';

    import { fileURLToPath } from 'url';
    import cardapio from './data/cardapio.js';
    import cardapioRouter from './rotas/cardapio.js';
    import produtosRouter from './rotas/produtos.js';

        const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

    app.use(cors());
     app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/img', express.static(path.join(__dirname, 'img')));
    app.get('/api/cardapio', (req, res) => {

    res.json(cardapio);

});

app.use('/api/cardapio', cardapioRouter);
    app.use('/api/produtos', produtosRouter);
    app.listen(port, () => {

    console.log(`Servidor rodando em http://localhost:${port}`);

});