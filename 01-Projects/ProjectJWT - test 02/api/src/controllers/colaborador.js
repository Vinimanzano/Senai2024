const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { matricula, pin } = req.body;
    
    try {
        const colaborador = await prisma.colaborador.findFirst({
            where: {
                matricula: matricula,
                pin: pin
            }
        });

        if (colaborador) {
            const token = jwt.sign({ matricula: colaborador.matricula }, process.env.SECRET_KEY, {
                expiresIn: '3600'
            });
            colaborador.token = token;
            return res.json(colaborador);
        } else {
            return res.status(401).json({ message: 'Matrícula ou PIN inválidos' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { matricula, nome, cargo, setor, pin } = req.body;

        if (!matricula || !nome || !cargo || !setor || !pin) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const colaborador = await prisma.colaborador.create({
            data: {
                matricula,
                nome,
                cargo,
                setor,
                pin
            }
        });

        if (!colaborador) {
            return res.status(400).json({ message: 'Falha ao criar colaborador' });
        }

        return res.status(201).json(colaborador);
    } catch (error) {
        console.error('Erro ao criar colaborador:', error);
        return res.status(500).json({ message: 'Erro ao criar colaborador', details: error.message });
    }
};

const read = async (req, res) => {
    try {
        if (req.params.matricula) {
            const colaborador = await prisma.colaborador.findUnique({
                where: {
                    matricula: req.params.matricula
                }
            });

            if (colaborador) {
                return res.json(colaborador);
            } else {
                return res.status(404).json({ message: 'Colaborador não encontrado' });
            }
        } else {
            const colaboradores = await prisma.colaborador.findMany();
            return res.json(colaboradores);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    const { matricula } = req.params;

    try {
        const colaborador = await prisma.colaborador.update({
            where: {
                matricula: matricula
            },
            data: req.body
        });
        return res.status(202).json(colaborador);
    } catch (error) {
        return res.status(404).json({ message: 'Colaborador não encontrado ou erro ao atualizar' });
    }
};

const del = async (req, res) => {
    try {
        const { matricula } = req.params;
        await prisma.colaborador.delete({
            where: {
                matricula: matricula
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: 'Colaborador não encontrado ou erro ao excluir' });
    }
};

module.exports = { 
    login, 
    create, 
    read, 
    update, 
    del 
};
