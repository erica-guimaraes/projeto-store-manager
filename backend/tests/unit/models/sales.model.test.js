const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { modelSales } = require('../../../src/models');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a camada Sales Model', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  const allSalesMock = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2023-08-23T23:33:54.000Z',
    },
  ];

  it('Listando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);

    const sales = await modelSales.findAll();
    expect(JSON.stringify(sales)).to.equal(JSON.stringify(allSalesMock));
  }); 

  it('Listando venda pelo Id', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock[0]]);

    const sale = await modelSales.findById(1);
    expect(JSON.stringify(sale)).to.equal(JSON.stringify(allSalesMock[0]));
  });

  it('Adicionando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const insertId = await modelSales.addSales([{
      productId: 1,
      quantity: 2,
    }]);
    expect(insertId).to.equal(1);
  });
});