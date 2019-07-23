const Products = require('../../src/models/products/products-model');
// let categories = new Products();
const supergoose = require('./supergoose.js');

let products = new Products();

describe('Products Model', () => {
  beforeEach(() => {
    products = new Products();
  });
  // How might we repeat this to check on types?
  it('can post() a new products', () => {
    let obj = { name: 'Test Product' };
    return products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error);
  });
  it('can get() a products', () => {
    let obj = { name: 'Test Product' };
    products.create(obj)
      .then(record => {
        products.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      })
      .catch(err => console.error);
  });
  it('can delete() a category', () => {
    let obj = { name: 'Test Product' };
    products.create(obj)
      .then(record => {
        return products.delete(record._id)
          .then(category => {
            expect(products.get(record._id).name).toBeFalsy();
          });
      })
      .catch(err => console.error);
  });
  it('can update a category', () => {
    let obj = { name: 'Test Product', zoo: true };
    products.create(obj)
      .then(record => {
        products.update(record.id, { name: 'New Test Product', id: 55 })
          .then(category => {
            products.get(55)
              .then(zz => {
                expect(zz.name).toEqual('New Test Product');
              })
              .catch(err => console.error);
          });
      })
      .catch(err => console.error);
  });
  it('rejects bad type checks', () => {
    let obj = { name: 555 };
    products.create(obj)
      .then(record => {
        expect(record.id).toBeUndefined();
      })
      .catch(err => console.error);
  });
});