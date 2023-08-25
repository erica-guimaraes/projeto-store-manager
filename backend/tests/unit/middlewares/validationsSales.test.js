const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validationSales = require('../../../src/middlewares/validationSales');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para as Middlewares de Sales', function () {
  it('Validando a inclusão de uma venda - se existe a quantidade', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: [{ productId: 1 }, { productId: 2, quantity: 5 }],
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ message: '"quantity" is required' }),
    };

    await validationSales.validateQuantity(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  // it('Validando a inclusão de uma venda - se a quantidade é maior ou igual à 1', async function () {
  //   const next = sinon.stub().returns();
  //   const req = {
  //     body: [{ productId: 1, quantity: 0 }, { productId: 2, quantity: 0 }],
  //   };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  //   await validationSales.validateQuantity(req, res, next);

  //   expect(res.status).to.have.been.calledWith(422);
  //   expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  // });

  it('Testando Next', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }],
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validationSales.validateQuantity(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});