// Note: Using expect test syntax
module.exports = ({ expect, response }) => ({
  path: 'order_rows',
  method: 'delete',
  test() {
    // Expect the deletion to go through without warnings
    expect(response.warningCount).to.equal(0);
  }
});