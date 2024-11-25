const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova tarefa
const create = async (req, res) => {
  const { titulo, descricao, status, usuarioId } = req.body;

  try {
    const tarefa = await prisma.tarefas.create({
      data: {
        titulo,
        descricao,
        status,
        usuario: {
          connect: { id: usuarioId },
        },
      },
    });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

// Ler todas as tarefas
const read = async (req, res) => {
  try {
    const tarefas = await prisma.tarefas.findMany();
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tarefas." });
  }
};

// Ler uma tarefa específica
const readById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const tarefa = await prisma.tarefas.findUnique({
      where: { id: Number(id) },
    });
    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar tarefa." });
  }
};

// Atualizar uma tarefa
const update = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, usuarioId } = req.body;

  try {
    const tarefa = await prisma.tarefas.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        status,
        usuario: {
          connect: { id: usuarioId },
        },
      },
    });
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
};

// Deletar uma tarefa
const del = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tarefas.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa." });
  }
};

module.exports = {
  create,
  read,
  readById,
  update,
  del,
};
