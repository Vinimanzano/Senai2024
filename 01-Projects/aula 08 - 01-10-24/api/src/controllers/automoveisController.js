const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const automoveis = await prisma.automovel.findMany();
        return res.json(automoveis);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao recuperar automóveis" }).end();
    }
}

const create = async (req, res) => {
    const { modelo, preco } = req.body;
    try {
        if (!modelo || !preco) {
            return res.status(400).json({ erro: "Requisição inválida {modelo, preco}" }).end();
        }

        const novoAutomovel = await prisma.automovel.create({
            data: {
                modelo: modelo,
                preco: parseFloat(preco)
            }
        });

        return res.status(201).json(novoAutomovel);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao criar automóvel" }).end();
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { modelo, preco } = req.body;
    try {
        const automovelAtualizado = await prisma.automovel.update({
            where: { id: parseInt(id) },
            data: {
                modelo: modelo || undefined,
                preco: preco ? parseFloat(preco) : undefined
            }
        });
        return res.json(automovelAtualizado);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar automóvel" }).end();
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        const automovel = await prisma.automovel.findUnique({
            where: { id: parseInt(id) },
        });

        if (!automovel) {
            return res.status(404).json({ erro: "Automóvel não encontrado" }).end();
        }

        await prisma.automovel.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({ mensagem: "Automóvel deletado com sucesso" }).end();
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar automóvel" }).end();
    }
};

module.exports = {
    read,
    create,
    update,
    del
};
