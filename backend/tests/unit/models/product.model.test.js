const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { modelProducts } = require('../../../src/models');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a camada Products Model', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('Listando todos os produtos', async function () {
    const allProductsMock = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
    ];

    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const products = await modelProducts.findAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(allProductsMock);
  });

  it('Listando produto pelo id', async function () {
    const productIdMock = {
      id: 1,
      name: 'Martelo de Thor',
    };

    sinon.stub(connection, 'execute').resolves([[productIdMock]]);

    const product = await modelProducts.findById(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productIdMock);
  });

  it('Adicionando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const insertId = await modelProducts.addProduct('Capa dp Batman');
    expect(insertId).to.equal(1);
  });
});