const { init } = require('./steps/init')
const when = require('./steps/when')

describe(`When we invoke the GET /getAllTogethers endpoint`, () => {
    beforeAll(() => {
        init();
    });

    test(`Should return the right greeting`, async () => {
        const res = await when.we_invoke_getAllTogethers();

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(8);

        for (let i = 0; i < res.body.length; i += 1) {
            const master = res.body[i];
            expect(master).toHaveProperty("id");
            expect(master).toHaveProperty("name");
            expect(master).toHaveProperty("description");
        }
    });
});