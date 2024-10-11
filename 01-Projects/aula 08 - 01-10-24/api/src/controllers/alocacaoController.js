const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const read = async (req, res) => {
  try {
    const alocacao = await prisma.alocacao.findMany({
      include: {
        automovel: true,
        cliente: true,
        concessionaria: true,
      },
    });

    const result = alocacao.map((alocacao) => ({
      id: alocacao.id,
      area: alocacao.area,
      quantidade: alocacao.quantidade,
      automovel: alocacao.automovel,
    }));

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao recuperar alocações" });
  }
};

const readByArea = async (req, res) => {
  const { area } = req.params;
  try {
    const alocacao = await prisma.alocacao.findMany({
      where: { areaId: parseInt(area) },
      include: {
        automovel: true,
        cliente: true,
        concessionaria: true,
      },
    });

    const result = alocacao.map((alocacao) => ({
      id: alocacao.id,
      area: alocacao.area,
      quantidade: alocacao.quantidade,
      automovel: alocacao.automovel,
    }));

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao recuperar alocações" });
  }
};

const create = async (req, res) => {
  const { area, automovel, concessionaria, quantidade } = req.body;
  try {
    if (!area || !automovel || !concessionaria || !quantidade) {
      return res
        .status(400)
        .json({
          erro: "Requisição inválida {area, automovel, concessionaria, quantidade}",
        })
        .end();
    }

    const novaAlocacao = await prisma.alocacao.create({
      data: {
        area: parseInt(area),
        automovel: parseInt(automovel),
        concessionaria: parseInt(concessionaria),
        quantidade: parseInt(quantidade),
      },
    });

    return res.status(201).json(novaAlocacao);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar alocação" }).end();
  }
};

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
        quantidade: quantidade || undefined,
      },
    });
    return res.json(alocacaoAtualizada);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar alocação" }).end();
  }
};

const del = async (req, res) => {
  const { id } = req.params;
  try {
    const alocacao = await prisma.alocacao.findUnique({
      where: { id: parseInt(id) },
    });

    if (!alocacao) {
      return res.status(404).json({ erro: "Alocação não encontrada" }).end();
    }

    await prisma.alocacao.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ mensagem: "Alocação deletada com sucesso" })
      .end();
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar alocação" }).end();
  }
};

module.exports = {
  read,
  readByArea,
  create,
  update,
  del,
};
