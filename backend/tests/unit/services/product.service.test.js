const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { modelProducts } = require('../../../src/models');
const { serviceProducts } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para camada Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Listando todos os produtos', async function () {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
    ];
    
    sinon.stub(modelProducts, 'findAll').resolves(products);

    const response = await serviceProducts.findAll();

    const serviceResponse = { status: 'SUCCESSFUL', data: products };
    expect(response).to.deep.equal(serviceResponse);
  });

  it('Listando produto pelo id', async function () {
    const productId = [
      { id: 1, name: 'Martelo de Thor' },
    ];
    
    sinon.stub(modelProducts, 'findById').resolves(productId);

    const response = await serviceProducts.findById();

    const serviceResponse = { status: 'SUCCESSFUL', data: productId };
    expect(response).to.deep.equal(serviceResponse);
  });

  it('Requisição com id enexistente', async function () {
    const idNotFound = 0;

    sinon.stub(modelProducts, 'findById').resolves(idNotFound);

    const response = await serviceProducts.findById();

    const serviceResponse = { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    expect(response).to.deep.equal(serviceResponse);
  });

  it('Adicionando um novo produto', async function () {
    const nameProduct = { name: 'ProdutoX' };

    const productAdded = {
      id: 4,
      name: 'ProdutoX',
    };
    
    sinon.stub(modelProducts, 'addProduct').resolves(4);

    const response = await serviceProducts.addProduct(nameProduct);

    expect(response.status).to.equal('CREATED');
    expect(response.data).to.deep.equal(productAdded);
  });
});