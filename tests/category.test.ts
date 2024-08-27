import app from '../src/app';
let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});

// TODO: CREATE TESTS
describe('CATEGORY', () => {
  it('should pass a basic truthy test', () => {
    expect(true).toBe(true);
  });
});
