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
  it('add user with null password', async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      about: faker.lorem.words(),
      password: null,
      email: faker.internet.email()
    }
    try {
      const result = await chai.request(app).post(`${URI_PREFIX}/users`)
        .send({ user });
      expect(result.status).to.be.equal(404)
    } catch (e) {
      expect(e.message).to.be.equal('error')
    }
  });
  it('add user with null username', async () => {
    const user = {
      username: null,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validatorKey).to.be.equal('is_null');
      expect(result.status).to.be.equal(404);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with empty username', async () => {
    const user = {
      username: '',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validatorKey).to.be.equal('notEmpty');
      expect(result.status).to.be.equal(404);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });

  it('add user with short username', async () => {
    const user = {
      username: 'usser',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({user});
      console.log(result.body);
      expect(result.body.validatorKey).to.be.equal('len');
      expect(result.status).to.be.equal(404);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with existing username', async () => {
    const existingUser = await models.User.findById(1);
    const user = {
      username: existingUser.username,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validatorKey).to.be.equal('not_unique');
      expect(result.status).to.be.equal(404);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
});

after(async () => {
  await models.User.destroy({
    where: {},
    truncate: true
  });
  request.close();
  process.exit();
});
