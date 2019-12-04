// Note: Using assert test syntax
module.exports = ({ assert, response, store }) => ({
  path: 'order_rows',
  method: 'get',
  test() {
    assert.equal(response.length, store.mockOrderRows.length);
    assert.deepEqual(response, store.mockOrderRows);
  }
});