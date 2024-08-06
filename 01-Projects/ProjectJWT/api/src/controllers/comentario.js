const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body);
        const os = parseInt(req.body.os, 10);

        const comment = await prisma.comentario.create({
            data: {
                os: os,
                colaborador: req.body.colaborador,
                data: req.body.data,
                comentario: req.body.comentario
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Erro ao criar comentário', error);
        res.status(500).json({ error: 'Erro ao criar comentário' });
    }
};

const read = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const comentario = await prisma.comentario.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if (!comentario) {
                return res.status(404).json({ message: "Comentário não encontrado" });
            }

            return res.json(comentario);
        }

        const comentarios = await prisma.comentario.findMany();
        return res.json(comentarios);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        return res.status(400).json({ message: "Erro ao buscar comentários" });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;

        const updatedComentario = await prisma.comentario.update({
            where: {
                id: parseInt(id)
            },
            data: {
                comentario
            }
        });

        return res.json(updatedComentario);
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        return res.status(400).json({ message: "Erro ao atualizar comentário" });
    }
}

const del = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.comentario.delete({
            where: {
                id: parseInt(id)
            }
        });

        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao excluir comentário:', error);
        return res.status(400).json({ message: "Erro ao excluir comentário" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
}
