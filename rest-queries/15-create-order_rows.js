// Note: Using should test syntax
module.exports = ({ response, store, repeat, i }) => ({
  path: 'order_rows',
  method: 'post',
  body: store.mockOrderRows[i],
  test() {
    // check that a row was inserted in the db
    response.affectedRows.should.equal(1);
    // store the inserted id in mockUsers
    // store.mockOrderRows[i].orderid = response.insertId;
    // repeat this step/query as long as
    // there a more mockUsers to insert
    if(store.mockOrderRows[i + 1]){
      repeat();
    }
  }
});