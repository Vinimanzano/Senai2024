const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const create = async (req, res) => {
    try {
        const { nome, descricao, data, idTurmas } = req.body;
        const atividade = await prisma.atividades.create({
            data: {
                nome,
                descricao,
                data: new Date(data),
                turma: { connect: { idTurmas } }
            }
        });
        res.status(201).json(atividade);
    } catch (error) {
        console.error("Erro ao criar atividade:", error);
        res.status(500).send("Erro ao criar atividade");
    }
};

// READ
const read = async (req, res) => {
    try {
        const atividades = await prisma.atividades.findMany({
            include: {
                turma: true
            }
        });
        res.status(200).json(atividades);
    } catch (error) {
        console.error("Erro ao buscar atividades:", error);
        res.status(500).send("Erro ao buscar atividades");
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const data = req.body;
        const idAtividades = req.params.id;

        const atividadeExists = await prisma.atividades.findUnique({
            where: {
                idAtividades: idAtividades
            }
        });

        if (!atividadeExists) {
            return res.status(404).json({ error: "Atividade não encontrada" });
        }

        const updateData = {};

        if (data.nome) {
            updateData.nome = data.nome;
        }
        if (data.descricao) {
            updateData.descricao = data.descricao;
        }
        if (data.data) {
            updateData.data = new Date(data.data);
        }
        if (data.idTurmas) {
            updateData.turma = { connect: { idTurmas: data.idTurmas } };
        }

        const atividade = await prisma.atividades.update({
            where: {
                idAtividades: idAtividades
            },
            data: updateData
        });

        res.status(200).json(atividade);
    } catch (error) {
        console.error("Erro ao atualizar atividade:", error);
        res.status(500).send("Erro ao atualizar atividade");
    }
};

// DELETE
const del = async (req, res) => {
    const { id } = req.params;
    try {
        const atividadeExists = await prisma.atividades.findUnique({
            where: { idAtividades: id }
        });

        if (!atividadeExists) {
            return res.status(404).json({ error: "Atividade não encontrada" });
        }

        // Remove a atividade
        await prisma.atividades.delete({
            where: {
                idAtividades: id
            }
        });

        res.status(200).json({ message: "Atividade excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir atividade:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = {
    create,
    read,
    update,
    del,
};