const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany();
        return res.json(clientes);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao recuperar clientes" }).end();
    }
}

const create = async (req, res) => {
    const { nome } = req.body;
    try {
        if (!nome) {
            return res.status(400).json({ erro: "Requisição inválida {nome}" }).end();
        }

        const novoCliente = await prisma.cliente.create({
            data: { nome }
        });

        return res.status(201).json(novoCliente);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao criar cliente" }).end();
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const clienteAtualizado = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: {
                nome: nome || undefined
            }
        });
        return res.json(clienteAtualizado);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar cliente" }).end();
    }
}

module.exports = {
    read,
    create,
    update
}
