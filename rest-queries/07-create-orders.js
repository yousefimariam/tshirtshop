// Note: Using should test syntax
module.exports = ({ response, store, repeat, i }) => ({
    path: 'orders',
    method: 'post',
    body: store.mockOrders[i],
    test() {
      // check that a row was inserted in the db
      response.affectedRows.should.equal(1);
      // store the inserted id in mockUsers
      store.mockOrders[i].orderid = response.insertId;
      // repeat this step/query as long as
      // there a more mockUsers to insert
      if(store.mockOrders[i + 1]){
        repeat();
      }
    }
  });