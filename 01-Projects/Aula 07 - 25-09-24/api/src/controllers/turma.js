const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const create = async (req, res) => {
    try {
        const { nome, cadastro } = req.body;
        const turma = await prisma.turmas.create({
            data: {
                nome,
                cadastro
            }
        });
        res.status(201).json(turma);
    } catch (error) {
        console.error("Erro ao criar turma:", error);
        res.status(500).send("Erro ao criar turma");
    }
};

// READ
const read = async (req, res) => {
    try {
        const turmas = await prisma.turmas.findMany({
            include: {
                alunos: true,
                atividades: true
            }
        });
        res.status(200).json(turmas);
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).send("Erro ao buscar turmas");
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const data = req.body;
        const idTurmas = req.params.id;

        const turmaExists = await prisma.turmas.findUnique({
            where: {
                idTurmas: idTurmas
            }
        });

        if (!turmaExists) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }

        const updateData = {};

        if (data.nome) {
            updateData.nome = data.nome;
        }
        if (data.cadastro) {
            updateData.cadastro = data.cadastro;
        }

        const turma = await prisma.turmas.update({
            where: {
                idTurmas: idTurmas
            },
            data: updateData
        });

        res.status(200).json(turma);
    } catch (error) {
        console.error("Erro ao atualizar turma:", error);
        res.status(500).send("Erro ao atualizar turma");
    }
};

// DELETE
const del = async (req, res) => {
    const { id } = req.params;
    try {
        const turmaExists = await prisma.turmas.findUnique({
            where: { idTurmas: id }
        });

        if (!turmaExists) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }

        // Remove a turma
        await prisma.turmas.delete({
            where: {
                idTurmas: id
            }
        });

        res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir turma:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = {
    create,
    read,
    update,
    del,
};
