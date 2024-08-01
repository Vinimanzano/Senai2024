const express = require('express');
const router = express.Router();
const path = require('path');
const { exec } = require('child_process');

const Middleware = require('./middleware/middleware');
const Colaborador = require('./controllers/colaborador');
const Os = require('./controllers/os');
const Comentario = require('./controllers/comentario');

router.post('/login', Colaborador.login);

router.post('/colaborador', Colaborador.create);
router.get('/colaborador', Middleware.validaAcesso, Colaborador.read);
router.get('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.read);
router.put('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.update);
router.delete('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.del);

router.post('/os', Middleware.validaAcesso, Os.create);
router.get('/os/:id', Middleware.validaAcesso, Os.read);
router.get('/os', Middleware.validaAcesso, Os.read);
router.put('/os/:id', Middleware.validaAcesso, Os.update);
router.delete('/os/:id', Middleware.validaAcesso, Os.del);

router.post('/comentario', Middleware.validaAcesso, Comentario.create);
router.get('/comentario/os/:id', Middleware.validaAcesso, Comentario.read);
router.get('/comentario', Middleware.validaAcesso, Comentario.read);
router.put('/comentario/:id', Middleware.validaAcesso, Comentario.update);
router.delete('/comentario/:id', Middleware.validaAcesso, Comentario.del);

router.post('/seed', Middleware.validaAcesso, (req, res) => {
    exec(`node ${path.join(__dirname, '../../api/prisma/seed.js')}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Erro ao executar o seed:', stderr);
            return res.status(500).json({ message: 'Erro ao executar o seed' });
        }
        console.log('Seed executado com sucesso:', stdout);
        res.status(200).json({ message: 'Seed executado com sucesso' });
    });
});

router.get('/', (req, res) => res.json("API OSs respondendo"));

module.exports = router;
