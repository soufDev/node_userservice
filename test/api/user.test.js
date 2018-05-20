import chai from 'chai';
import chaiHttp from 'chai-http';
import Promise from 'bluebird';
import env from 'dotenv';
import faker from 'faker';
import app from '../../app';

before(() => {
  console.log('test ', env);
});

chai.use(chaiHttp);
const {
  expect
} = chai;
const request = chai.request(app);
Promise.promisifyAll(request);
const URI_PREFIX = '/api/v1';
describe('User API', () => {
  it('GET all', async () => {
    try {
      console.log(env);
      const result = await request.get(`${URI_PREFIX}/users`);
      expect(result.body).to.be.an('array');
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user', async () => {
    try {
      const user = {
        firstname: faker.
      }
      const result = await request.post(`${URI_PREFIX}/users`);

    } catch (e) {

    }
  })
});

after(() => {
  request.close();
  process.exit();
});
