const express = require('express');

const tarefas = require('./controllers/tarefas');
const usuario = require('./controllers/usuario');

const router = express.Router();

router.get('/tarefas', tarefas.create);
router.get('/tarefas/:id', tarefas.create);
router.post('/tarefas', tarefas.read);
router.put('/tarefas/:id', tarefas.update);
router.delete('/tarefas/:id', tarefas.del);

router.get('/usuarios', usuario.create);
router.get('/usuarios/:id', usuario.create);
router.post('/usuarios', usuario.read);
router.put('/usuarios/:id', usuario.update);
router.delete('/usuarios/:id', usuario.del);

module.exports = router;