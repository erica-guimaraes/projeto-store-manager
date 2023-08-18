const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { modelSales } = require('../../../src/models');
const { serviceSales } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('testando a camada service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Get all sales', async function () {
    const sales = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];
    
    sinon.stub(modelSales, 'findAll').resolves(sales);

    const response = await serviceSales.findAll();

    const serviceResponse = { status: 'SUCCESSFUL', data: sales };
    expect(response).to.deep.equal(serviceResponse);
  });
});