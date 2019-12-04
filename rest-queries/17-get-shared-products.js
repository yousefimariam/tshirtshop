module.exports = ({ expect, response }) => ({
    path: 'sharedTshirtData',
    method: 'get',
    test() {
        expect(response.length).to.equal(4);
    }
}); 