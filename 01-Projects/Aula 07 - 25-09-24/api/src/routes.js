const express = require('express');
const app = express();
const port = 3000;

const atividadesRouter = require('./controllers/atividade');
const turmasRouter = require('./controllers/turma');
const professoresRouter = require('./controllers/professor');

// Middleware para parsing de JSON
app.use(express.json());

// Define as rotas
app.use('/api/atividades', atividadesRouter);
app.use('/api/turmas', turmasRouter);
app.use('/api/professores', professoresRouter);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
