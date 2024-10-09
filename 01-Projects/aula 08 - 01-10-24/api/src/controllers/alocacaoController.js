const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const alocacoes = await prisma.alocacao.findMany();
        return res.json(alocacoes);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao recuperar alocações" }).end();
    }
}

const create = async (req, res) => {
    const { area, automovel, concessionaria, quantidade } = req.body;
    try {
        if (!area || !automovel || !concessionaria || !quantidade) {
            return res.status(400).json({ erro: "Requisição inválida {area, automovel, concessionaria, quantidade}" }).end();
        }

        const novaAlocacao = await prisma.alocacao.create({
            data: {
                area: parseInt(area),
                automovel: parseInt(automovel),
                concessionaria: parseInt(concessionaria),
                quantidade: parseInt(quantidade)
            }
        });

        return res.status(201).json(novaAlocacao);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao criar alocação" }).end();
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { area, automovel, concessionaria, quantidade } = req.body;
    try {
        const alocacaoAtualizada = await prisma.alocacao.update({
            where: { id: parseInt(id) },
            data: {
                area: area || undefined,
                automovel: automovel || undefined,
                concessionaria: concessionaria || undefined,
                quantidade: quantidade || undefined
            }
        });
        return res.json(alocacaoAtualizada);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar alocação" }).end();
    }
}

module.exports = {
    read,
    create,
    update
}
