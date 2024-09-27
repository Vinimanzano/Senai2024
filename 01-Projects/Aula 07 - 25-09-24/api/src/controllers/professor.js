const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const create = async (req, res) => {
    try {
        const { nome } = req.body;
        const professor = await prisma.professor.create({
            data: {
                nome
            }
        });
        res.status(201).json(professor);
    } catch (error) {
        console.error("Erro ao criar professor:", error);
        res.status(500).send("Erro ao criar professor");
    }
};

// READ
const read = async (req, res) => {
    try {
        const professores = await prisma.professor.findMany();
        res.status(200).json(professores);
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        res.status(500).send("Erro ao buscar professores");
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const data = req.body;
        const idProfessor = req.params.id;

        const professorExists = await prisma.professor.findUnique({
            where: {
                idProfessor: idProfessor
            }
        });

        if (!professorExists) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }

        const updateData = {};

        if (data.nome) {
            updateData.nome = data.nome;
        }

        const professor = await prisma.professor.update({
            where: {
                idProfessor: idProfessor
            },
            data: updateData
        });

        res.status(200).json(professor);
    } catch (error) {
        console.error("Erro ao atualizar professor:", error);
        res.status(500).send("Erro ao atualizar professor");
    }
};

// DELETE
const del = async (req, res) => {
    const { id } = req.params;
    try {
        const professorExists = await prisma.professor.findUnique({
            where: { idProfessor: id }
        });

        if (!professorExists) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }

        // Remove o professor
        await prisma.professor.delete({
            where: {
                idProfessor: id
            }
        });

        res.status(200).json({ message: "Professor excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir professor:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = {
    create,
    read,
    update,
    del,
};
