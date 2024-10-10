const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const concessionarias = await prisma.concessionaria.findMany();
        return res.json(concessionarias);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao recuperar concessionárias" }).end();
    }
}

const create = async (req, res) => {
    const { concessionaria } = req.body;
    try {
        if (!concessionaria) {
            return res.status(400).json({ erro: "Requisição inválida {concessionaria}" }).end();
        }

        const novaConcessionaria = await prisma.concessionaria.create({
            data: { concessionaria }
        });

        return res.status(201).json(novaConcessionaria);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao criar concessionária" }).end();
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { concessionaria } = req.body;
    try {
        const concessionariaAtualizada = await prisma.concessionaria.update({
            where: { id: parseInt(id) },
            data: {
                concessionaria: concessionaria || undefined
            }
        });
        return res.json(concessionariaAtualizada);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar concessionária" }).end();
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        // Verifica se a concessionária existe
        const concessionaria = await prisma.concessionaria.findUnique({
            where: { id: parseInt(id) },
        });

        if (!concessionaria) {
            return res.status(404).json({ erro: "Concessionária não encontrada" }).end();
        }

        // Deleta a concessionária
        await prisma.concessionaria.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({ mensagem: "Concessionária deletada com sucesso" }).end();
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar concessionária" }).end();
    }
};

module.exports = {
    read,
    create,
    update,
    del
};
