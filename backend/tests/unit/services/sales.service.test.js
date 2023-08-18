const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { modelSales } = require('../../../src/models');
const { serviceSales } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para a camada Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Listando todas as vendas', async function () {
    const sales = [
      {
        saleId: 1,
        date: '2023-08-18T23:04:47.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2023-08-18T23:04:47.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-08-18T23:04:47.000Z',
        productId: 3,
        quantity: 15,
      },
    ];
    
    sinon.stub(modelSales, 'findAll').resolves(sales);

    const response = await serviceSales.findAll();

    const serviceResponse = { status: 'SUCCESSFUL', data: sales };
    expect(response).to.deep.equal(serviceResponse);
  });

  it('Listando venda pelo id', async function () {
    const salesId = [
        {
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 10,
        },
    ];
    
    sinon.stub(modelSales, 'findById').resolves(salesId);

    const response = await serviceSales.findById();

    const serviceResponse = { status: 'SUCCESSFUL', data: salesId };
    expect(response).to.deep.equal(serviceResponse);
  });

  it('Requisição com id enexistente', async function () {
    const idNotFound = 0;

    sinon.stub(modelSales, 'findById').resolves(idNotFound);

    const response = await serviceSales.findById();

    const serviceResponse = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    expect(response).to.deep.equal(serviceResponse);
  });
});