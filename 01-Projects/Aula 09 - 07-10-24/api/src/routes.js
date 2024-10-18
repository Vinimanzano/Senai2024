const express = require('express');

const comentarios = require('./controllers/comentarios');
const equipamentos = require('./controllers/equipamentos');
const usuarios = require('./controllers/usuarios');
const perfis = require('./controllers/perfis');

const router = express.Router();

router.get('/comentarios', comentarios.read);
router.get('/comentarios/:id', comentarios.readbyequip);
router.post('/comentarios', comentarios.create);
router.put('/comentarios/:id', comentarios.update);
router.delete('/comentarios/:id', comentarios.del);

router.get('/equipamentos', equipamentos.read);
router.post('/equipamentos', equipamentos.create);
router.put('/equipamentos/:id', equipamentos.update);
router.delete('/equipamentos/:id', equipamentos.del);

router.get('/perfis', perfis.read);
router.post('/perfis', perfis.create);
router.put('/perfis/:id', perfis.update);
router.delete('/perfis/:id', perfis.del);

router.get('/usuarios', usuarios.read);
router.post('/usuarios', usuarios.create);
router.put('/usuarios/:id', usuarios.update);
router.delete('/usuarios/:id', usuarios.del);

module.exports = router;