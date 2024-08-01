const jwt = require('jsonwebtoken');
require('dotenv').config();

const validaAcesso = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = data;
        next();
    });
};

module.exports = { validaAcesso };
