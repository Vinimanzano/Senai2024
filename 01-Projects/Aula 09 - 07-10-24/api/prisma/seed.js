const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const comentario_json = require('../dados/comentario.json');
const equipamentos_json = require('../dados/equipamentos.json');
const perfis_json = require('../dados/perfis.json');
const usuarios_json = require('../dados/usuarios.json');

async function importComentarios() {
    await prisma.comentarios.createMany({
        data: comentario_json,
        skipDuplicates: true
    });
    console.log('Comentarios Importados com Sucesso!');
}

async function importEquipamentos() {
    await prisma.equipamentos.createMany({
        data: equipamentos_json,
        skipDuplicates: true
    });
    console.log('Equipamentos Importados com Sucesso!');
}

async function importPerfis() {
    await prisma.perfis.createMany({
        data: perfis_json,
        skipDuplicates: true
    });
    console.log('Perfis Importados com Sucesso!');
}

async function importUsuarios(){
    await prisma.usuarios.createMany({
        data: usuarios_json,
        skipDuplicates: true
    });
    console.log('Usuários Importados com Sucesso!');
}

async function main() {
    await importComentarios();
    await importEquipamentos();
    await importPerfis();
    await importUsuarios();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
