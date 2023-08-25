const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { controllerProducts } = require('../../../src/controllers');
const { serviceProducts } = require('../../../src/services');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a camada Product Controller', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('Listando todos os produtos', async function () {
    const allProductsMock = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
    ];

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(serviceProducts, 'findAll').resolves({
      status: 200,
      data: allProductsMock,
    });

    await controllerProducts.findAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allProductsMock)).to.be.equal(true);
  });

  it('Listando produto pelo id', async function () {
    const productIdMock = {
      id: 1,
      name: 'Martelo de Thor',
    };

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(connection, 'execute').resolves([[productIdMock]]);

    await controllerProducts.findById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(productIdMock)).to.be.equal(true);
  });

  it('Adicionando um novo produto', async function () {
    const req = {
      body: {
        name: 'Capa do Batman',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(serviceProducts, 'addProduct').resolves({
      status: 201,
      data: { insertId: 1 },
    });

    await controllerProducts.addProduct(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith({ insertId: 1 })).to.be.equal(true);
  });

  it('Atualizando um produto', async function () {
    const req = {
      params: { id: 1 },
      body: {
        name: 'Capa do Batman',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(serviceProducts, 'updateProduct').resolves({
      status: 200,
      data: { id: 1, name: 'Capa do Batman' },
    });
    await controllerProducts.updateProduct(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, name: 'Capa do Batman' })).to.be.equal(true);
  });
});