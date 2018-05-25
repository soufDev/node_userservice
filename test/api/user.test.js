import chai from 'chai';
import chaiHttp from 'chai-http';
import Promise from 'bluebird';
import env from 'dotenv';
import faker from 'faker';
import app from '../../app';
import models from '../../db/models';

const URI_PREFIX = '/api/v1';
const addUser = async () => {
  const userToAdd = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    about: faker.lorem.words(),
    password: faker.internet.password(),
    email: faker.internet.email()
  }
  const result = await chai.request(app)
    .post(`${URI_PREFIX}/users`)
    .send({ user: userToAdd });
  return result.body.id;
}

before(async () => {
  await models.User.destroy({
    where: {},
    truncate: true
  });
  await addUser();
  process.env.SERVER_PORT = 3000;
});

chai.use(chaiHttp);
const {
  expect
} = chai;
const request = chai.request(app);
Promise.promisifyAll(request);
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
      expect(result.status).to.be.equal(400)
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
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('is_null');
      expect(result.status).to.be.equal(400);
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
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('notEmpty');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });

  it('add user with short username', async () => {
    const user = {
      username: 'us',
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
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('len');
      expect(result.status).to.be.equal(400);
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
        .send({user});
      console.log(result.body);
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('not_unique');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with null email', async () => {
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: null
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('is_null');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with empty email', async () => {
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: ''
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('notEmpty');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });

  it('add user with invalid email', async () => {
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: 'sou@sdsd'
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('isEmail');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with existing email', async () => {
    const existingUser = await models.User.findById(1);
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: existingUser.email
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.validation_errors[0].validatorKey).to.be.equal('not_unique');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
});
describe('update user', () => {
  it('update user with existing username', async () => {
    const id = await addUser();
    const existingUser = await models.User.findById(1);
    const user = {
      username: existingUser.username,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('not_unique');
    expect(result.status).to.be.equal(400);
  });
  it('update user with short username', async () => {
    const id = await addUser();
    const user = {
      username: 'az',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('len');
    expect(result.status).to.be.equal(400);
  });
  it('update user with null username', async () => {
    const id = await addUser();
    const user = {
      username: null,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('is_null');
    expect(result.status).to.be.equal(400);
  });
  it('update user with empty username', async () => {
    const id = await addUser();
    const user = {
      username: '',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('notEmpty');
    expect(result.status).to.be.equal(400);
  });
  it('update user with existing email', async () => {
    const id = await addUser();
    const existingUser = await models.User.findById(1);
    const user = {
      username: existingUser.username,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('not_unique');
    expect(result.status).to.be.equal(400);
  });
  it('update user with invalid email', async () => {
    const id = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: 'azeazeazeaze'
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('isEmail');
    expect(result.status).to.be.equal(400);
  });
  it('update user with null email', async () => {
    const id = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: null
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('is_null');
    expect(result.status).to.be.equal(400);
  });
  it('update user with empty email', async () => {
    const id = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: ''
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/user/${id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.validation_errors[0].validatorKey).to.be.equal('notEmpty');
    expect(result.status).to.be.equal(400);
  });
});

describe('find User', () => {
  it('not found user', async () => {
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/user/${123456789}`);
    console.log(result.body);
    expect(result.body.message).to.be.equal('User not found');
    expect(result.status).to.be.equal(404);
  });
  it('find user with username', async () => {
    const { username } = await models.User.findById(await addUser());
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/user/${username}`);
    console.log(result.body);
    expect(result.body.user.username).to.be.equal(username);
    expect(result.status).to.be.equal(200);
  })
  it('find user with id', async () => {
    const { id, username } = await models.User.findById(await addUser());
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/user/${id}`);
    console.log(result.body);
    expect(result.body.user.username).to.be.equal(username);
    expect(result.status).to.be.equal(200);
  })
});

describe('delete User', () => {
  it('not found user', async () => {
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/user/${1234567}`);
    console.log(result.body);
    expect(result.body.message).to.be.equal('User not found');
    expect(result.status).to.be.equal(404);
  });
  it('delete user with username', async () => {
    const { username } = await models.User.findById(await addUser());
    const users = await models.User.findAll();
    const size = users.length;
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/user/${username}`);
    const usersAfterDelete = await models.User.findAll();
    const sizeAfterDelete = usersAfterDelete.length;
    console.log(result.body);
    expect(size - 1).to.be.equal(sizeAfterDelete);
    expect(result.status).to.be.equal(200);
  });
  it('delete user with id', async () => {
    const id = await addUser();
    const users = await models.User.findAll();
    const size = users.length;
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/user/${id}`);
    const usersAfterDelete = await models.User.findAll();
    const sizeAfterDelete = usersAfterDelete.length;
    console.log(result.body);
    expect(size - 1).to.be.equal(sizeAfterDelete);
    expect(result.status).to.be.equal(200);
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
