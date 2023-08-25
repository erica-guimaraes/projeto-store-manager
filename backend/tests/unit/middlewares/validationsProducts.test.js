const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validationsProduct = require('../../../src/middlewares/validationsProducts');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para as Middlewares de Products', function () {
  it('Validando a inclusão de um novo produto - se existe o nome', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: '' },
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ message: '"name" is required' }),
    };

    await validationsProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('Validando a inclusão de um novo produto - nome maior que 5 caracteres', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'Edu' },
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ message: '"name" length must be at least 5 characters long' }),
    };

    await validationsProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });

  it('Testando Next', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'Eduardo da Silva' },
    };

    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validationsProduct(req, res, next);

    expect(next.called).to.be.equal(true);
  });
});