const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { modelProducts } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { serviceProducts } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes para camada Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  // it('Listando todos os produtos', function () {

  // });
  
  it('Alterando produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await modelProducts.updateProduct(1, 'Produto Teste');
    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal({ id: 1, name: 'Produto Teste' });
  });
});
