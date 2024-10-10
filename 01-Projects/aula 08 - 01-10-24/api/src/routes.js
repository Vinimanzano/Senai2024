const express = require('express');
const automoveisController = require('./controllers/automoveisController');
const clientesController = require('./controllers/clientesController');
const concessionariasController = require('./controllers/concessionariasController');
const alocacaoController = require('./controllers/alocacaoController');

const router = express.Router();

router.get('/automoveis', automoveisController.read);
router.post('/automoveis', automoveisController.create);
router.put('/automoveis/:id', automoveisController.update);
router.delete('/automoveis/:id', automoveisController.del);

router.get('/clientes', clientesController.read);
router.post('/clientes', clientesController.create);
router.put('/clientes/:id', clientesController.update);
router.delete('/clientes/:id', clientesController.del);

router.get('/concessionarias', concessionariasController.read);
router.post('/concessionarias', concessionariasController.create);
router.put('/concessionarias/:id', concessionariasController.update);
router.delete('/concessionarias/:id', concessionariasController.del);

router.get('/alocacao', alocacaoController.read);
router.post('/alocacao', alocacaoController.create);
router.put('/alocacao/:id', alocacaoController.update);
router.delete('/alocacao/:id', alocacaoController.del);

module.exports = router;