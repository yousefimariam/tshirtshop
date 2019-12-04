// Note: Using assert test syntax
module.exports = ({ assert, response, store }) => ({
    path: 'products',
    method: 'get',
    test() {
     // Check that there are no orders in DB
     assert.deepEqual(response, []);
    },
    setup() {
      // Store the mockorders in the db (setup for next step/query)
      store.mockProducts = require('./mock-products.json');
      for(let i=0; i<store.mockProducts.length; i++){
          store.mockProducts[i].orderid=store.mockOrders[i].orderid;
      }
      //console.log("mockProducts", store.mockProducts)
    }
  });