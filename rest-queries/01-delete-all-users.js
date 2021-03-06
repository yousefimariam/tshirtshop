// Note: Using expect test syntax
module.exports = ({ expect, response }) => ({
  path: 'mariam users',
  method: 'delete',
  test() {
    // Expect the deletion to go through without warnings
    expect(response.warningCount).to.equal(0);
  }
});