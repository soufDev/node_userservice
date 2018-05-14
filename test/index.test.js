import chai from 'chai';
import chaiHttp from 'chai-http';
import Promise from 'bluebird';
import env from 'dotenv';
import app from '../app';

before(() => {
  console.log('test ', env);
});

chai.use(chaiHttp);
const {
  expect
} = chai;
const request = chai.request(app);
Promise.promisifyAll(request);
describe('API Home Page', () => {
  it('Main Page Content', async () => {
    try {
      console.log(env);
      const result = await request.get('/');
      expect(result.body.message).to.be.equal('HELLO GUYS I AM HERE');
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
});

after(() => {
  request.close();
  process.exit();
});
