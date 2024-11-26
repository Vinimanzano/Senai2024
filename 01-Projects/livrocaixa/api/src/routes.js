const express = require('express');
const router = express.Router();

const usuariosController = require('./controllers/usuarios');
const lancamentosController = require('./controllers/lancamentos');

router.get('/usuarios', usuariosController.read);
router.get('/usuarios/:id', usuariosController.read);
router.post('/usuarios', usuariosController.create);


router.get('/lancamentos', lancamentosController.read);
router.get('/lancamentos/:id', lancamentosController.read);
router.post('/lancamentos', lancamentosController.create);    
router.put('/lancamentos/:id', lancamentosController.update);
router.delete('/lancamentos/:id', lancamentosController.del);

module.exports = router;