const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const result = await prisma.comentarios.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readbyequip = async (req, res) => {
    try {
        const result = await prisma.comentarios.findMany({
            where: {
                equipamento: Number(req.params.id)
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

const create = async (req, res) => {
    const { comentario, equipamentoId, perfilId } = req.body;
  
    try {
      const result = await prisma.comentarios.create({
        data: {
          comentario,
          equipamento: equipamentoId,
          perfil: perfilId,           
          data: new Date(),          
        }
      });
  
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar comentário.' });
    }
  };


const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.comentarios.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.comentarios.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    read,
    readbyequip,
    create,
    update,
    del
};
