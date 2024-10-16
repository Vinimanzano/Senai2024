const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try{
        const result = await prisma.comentarios.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const create = async (req, res) => {
    const { comentario, equipamentoId, perfilId } = req.body;

    if (!comentario || !equipamentoId || !perfilId) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const result = await prisma.comentarios.create({
            data: {
                comentario,
                equipamentoId,
                perfilId,
                data: new Date()
            }
        });
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ error: error.message });
    }
};


const update = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await prisma.comentarios.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const del = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await prisma.comentarios.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    read,
    create,
    update,
    del
}