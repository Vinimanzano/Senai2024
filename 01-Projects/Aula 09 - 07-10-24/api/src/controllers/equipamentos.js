const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const read = async (req, res) => {
  try {
    const result = await prisma.equipamentos.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
    try {
        const { nome, imagem, descricao, status } = req.body; 
        const result = await prisma.equipamentos.create({
            data: {
                equipamento: nome,
                imagem,
                descricao,
                ativo: status,
                data: new Date(),
            },
        });
        res.status(201).json(result);
    } catch (error) {
        console.error("Erro ao criar equipamento:", error);
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.equipamentos.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const del = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await prisma.equipamentos.delete({
          where: { id: Number(id) },
      });
      res.status(200).json(result);
  } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
      res.status(500).json({ error: error.message });
  }
};



module.exports = {
  read,
  create,
  update,
  del,
};
