// Note: Using assert test syntax
module.exports = ({ assert, response, store }) => ({
  path: 'order_rows',
  method: 'get',
  test() {
    // Check that there are no order_rows in DB
    assert.deepEqual(response, []);
  },
  setup() {
    // Store the mockorder_rows in the db (setup for next step/query)
    store.mockOrderRows = require('./mock-order_rows.json');
    for (let i = 0; i < store.mockOrderRows.length; i++) {
      store.mockOrderRows[i].orderid = store.mockOrders[i].orderid;
    }
    for (let i = 0; i < store.mockOrderRows.length; i++) {
      store.mockOrderRows[i].productid = store.mockProducts[i].productid;
    }
    //console.log("mockOrderRows", store.mockOrderRows)
  }
});