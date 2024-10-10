const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clientes_json = require('../dados/clientes.json');
const automoveis_json = require('../dados/automoveis.json');
const alocacao_json = require('../dados/alocacao.json');
const concessionarias_json = require('../dados/concessionarias.json');

async function importAutomoveis() {
  await prisma.automovel.createMany({
    data: automoveis_json,
    skipDuplicates: true,
  });
  console.log('Automóveis importados com sucesso!');
}

async function importCliente() {
  const clientes = clientes_json.map(item => ({
    id: item.id,
    nome: item.nome
  }));

  await prisma.cliente.createMany({
    data: clientes,
    skipDuplicates: true
  });
  console.log('Clientes importados com sucesso!');
}

async function importConcessionarias() {
  const concessionarias = concessionarias_json.map(item => ({
    id: item.id,
    nome: item.concessionaria
  }));

  await prisma.concessionaria.createMany({
    data: concessionarias,
    skipDuplicates: true
  });
  console.log('Concessionárias importadas com sucesso!');
}

async function importAlocacao() {
  const alocacoes = alocacao_json.map(item => ({
    id: item.id,
    quantidade: item.quantidade,
    automovelId: item.automovel,
    clienteId: item.cliente, 
    concessionariaId: item.concessionaria
  }));

  console.log('Alocações a serem importadas:', alocacoes);

  await prisma.alocacao.createMany({
    data: alocacoes,
    skipDuplicates: true
  });
}

async function main() {
  await importAutomoveis();
  await importCliente();
  await importConcessionarias();
  await importAlocacao();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });