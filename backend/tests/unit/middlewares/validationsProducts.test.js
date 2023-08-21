const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validationNewProduct = require('../../../src/middlewares/validationsProducts');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para as Middlewares de Products', function () {
  it('Validando a inclusão de um novo produto', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'ProdutoX' },
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validationNewProduct(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});