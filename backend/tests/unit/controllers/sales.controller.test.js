const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { controllerSales } = require('../../../src/controllers');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a camada Sales Controller', function () {
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
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(connection, 'execute').resolves([allSalesMock]);

    await controllerSales.findAll(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSalesMock)).to.be.equal(true);
  });

  it('Listando venda pelo Id', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(connection, 'execute').resolves([allSalesMock[0]]);
    await controllerSales.findAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSalesMock[0])).to.be.equal(true);
  });
});