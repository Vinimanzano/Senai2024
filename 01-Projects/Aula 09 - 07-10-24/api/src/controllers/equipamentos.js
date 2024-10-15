const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const result = await prisma.equipamentos.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const result = await prisma.equipamentos.create({
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.equipamentos.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.equipamentos.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    read,
    create,
    update,
    del
}