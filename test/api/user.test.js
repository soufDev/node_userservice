import chai from 'chai';
import chaiHttp from 'chai-http';
import Promise from 'bluebird';
import env from 'dotenv';
import faker from 'faker';
import app from '../../app';
import models from '../../db/models';

before(async () => {
  await models.User.destroy({
    where: {},
    truncate: true
  });
  process.env.SERVER_PORT = 3000;
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
    console.log(env);
    const result = await request.get(`${URI_PREFIX}/users`);
    expect(result.body).to.be.an('array');
  });
  it('add user', async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .post(`${URI_PREFIX}/users`)
      .send({ user });
    expect(result.body).to.be.an('object');
    expect(result.body).to.not.have.key('password');
    expect(result.status).to.be.equal(201);
  })
});

after(async () => {
  await models.User.destroy({
    where: {},
    truncate: true
  });
  request.close();
  process.exit();
});
