// Note: Using assert test syntax
module.exports = ({ assert, response, store }) => ({
    path: 'orders',
    method: 'get',
    test() {
     // Check that there are no orders in DB
     assert.deepEqual(response, []);
    },
    setup() {
      // Store the mockorders in the db (setup for next step/query)
      store.mockOrders = require('./mock-orders.json');
      for(let i=0; i<store.mockOrders.length; i++){
          store.mockOrders[i].userid=store.mockUsers[i].id;
      }
      //console.log("mockOrders", store.mockOrders)
    }
  });