const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  res.status(201).json(user);
};

const read = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  
    res.status(201).json(user);
  };

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            name,
            email,
            password: await bcrypt.hash(password, 10),
        },
    });
  
    res.status(201).json(user);
  };  
  
const del = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id: Number(id) } });
  
    res.status(201).json(user);
    };

module.exports = {
  create,
  read,
  update,
  del
};
