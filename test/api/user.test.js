import chai from 'chai';
import chaiHttp from 'chai-http';
import env from 'dotenv';
import faker from 'faker';
import app from '../../app';
import User from '../../db/services/user';

const URI_PREFIX = '/api/v1';
const addUser = async () => {
  const userToAdd = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    about: faker.lorem.words(),
    password: faker.internet.password(),
    email: faker.internet.email().toLowerCase()
  }
  const result = await chai.request(app)
    .post(`${URI_PREFIX}/users`)
    .send({ user: userToAdd });
  return result.body;
}

before(async () => {
  await User.deleteAll();
  await addUser();
  process.env.SERVER_PORT = 3000;
});

chai.use(chaiHttp);
const {
  expect
} = chai
describe('User API', () => {
  it('GET all', async () => {
    console.log(env);
    const result = await chai.request(app).get(`${URI_PREFIX}/users`);
    console.log(result.body.users.length);
    console.log(result.body.users);
    expect(result.body.users).to.be.an('array');
  });
  it('add user', async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: '1morhpkiehny@personalcok.gq'
    }
    const result = await chai.request(app)
      .post(`${URI_PREFIX}/users`)
      .send({ user });
    console.log(result.body);
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
      email: faker.internet.email().toLowerCase()
    }
    try {
      const result = await chai.request(app).post(`${URI_PREFIX}/users`)
        .send({ user });
      expect(result.status).to.be.equal(400);
      expect(result.body.error).to.be.equal('required.password');
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
      email: faker.internet.email().toLowerCase()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.errors.username.message).to.be.equal('username.required');
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
      email: faker.internet.email().toLowerCase()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.errors.username.message).to.be.equal('username.required');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });

  it('add user with short username', async () => {
    const user = {
      username: 'usu',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.body.errors.username.message).to.be.equal('username.short.length');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with existing username', async () => {
    const users = await User.getAll();
    const user = {
      username: users[0].username,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      console.log('length', users.length);
      expect(result.headers['x-error']).to.be.equal('username.exist');
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
      expect(result.body.errors.email.message).to.be.equal('email.required');
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
      expect(result.body.errors.email.message).to.be.equal('email.required');
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
      expect(result.body.errors.email.message).to.be.equal('email.invalid');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
  it('add user with existing email', async () => {
    const existingUser = await User.getAll();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: existingUser[0].email
    }
    try {
      const result = await chai.request(app)
        .post(`${URI_PREFIX}/users`)
        .send({ user });
      console.log(result.body);
      expect(result.headers['x-error']).to.be.equal('email.exist');
      expect(result.status).to.be.equal(400);
    } catch (e) {
      expect(e.message).to.be.equal('error');
    }
  });
});
describe('update user', () => {
  it('update user with existing username', async () => {
    const body = await addUser();
    const user = {
      username: body.username,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.headers);
    expect(result.headers['x-error']).to.be.equal('username.exist');
    expect(result.status).to.be.equal(400);
  });
  it('update user with short username', async () => {
    const body = await addUser();
    const user = {
      username: 'az',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.username.message).to.be.equal('username.short.length');
    expect(result.status).to.be.equal(400);
  });
  it('update user with null username', async () => {
    const body = await addUser();
    const user = {
      username: null,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.username.message).to.be.equal('username.required');
    expect(result.status).to.be.equal(400);
  });
  it('update user with empty username', async () => {
    const body = await addUser();
    const user = {
      username: '',
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: faker.internet.email().toLowerCase()
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.username.message).to.be.equal('username.required');
    expect(result.status).to.be.equal(400);
  });
  it('update user with existing email', async () => {
    const body = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: body.email
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.headers['x-error']).to.be.equal('email.exist');
    expect(result.status).to.be.equal(400);
  });
  it('update user with invalid email', async () => {
    const body = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: 'azaz'
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.email.message).to.be.equal('email.invalid');
    expect(result.status).to.be.equal(400);
  });
  it('update user with null email', async () => {
    const body = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      password: faker.internet.password(),
      email: null
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.email.message).to.be.equal('email.required');
    expect(result.status).to.be.equal(400);
  });
  it('update user with empty email', async () => {
    const body = await addUser();
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      about: faker.lorem.words(),
      email: ''
    }
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.body.errors.email.message).to.be.equal('email.required');
    expect(result.status).to.be.equal(400);
  });
  it('update user successfully', async () => {
    const body = await addUser();
    console.log(body);
    const user = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastName: faker.name.lastName(),
      about: faker.lorem.text(),
      email: faker.internet.email().toLowerCase()
    }
    console.log({ userToUpdate: user });
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}`)
      .send({ user });
    console.log(result.body);
    expect(result.status).to.be.equal(200);
    const retrievedUser = await User.findById(body.id);
    console.log({ retrievedUser });
    expect(result.body.user.username).to.be.equal(user.username);
  })
  it('update user with invalid ID', async () => {
    const body = await addUser();
    console.log(body);
    const user = {
      username: faker.internet.userName({ minmum: 6 }),
      firstname: faker.name.firstName(),
      lastName: faker.name.lastName(),
      about: faker.lorem.text(),
      email: faker.internet.email().toLowerCase()
    }
    console.log({ userToUpdate: user });
    const result = await chai.request(app)
      .put(`${URI_PREFIX}/users/${body.id}123`)
      .send({ user });
    console.log(result.body);
    expect(result.status).to.be.equal(400);
    const retrievedUser = await User.findById(body.id);
    console.log({ retrievedUser });
    expect(result.headers['x-error']).to.be.equal('invalid.id.params');
  })
});

describe('find User', () => {
  it('invalid id params', async () => {
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/users/${123456789}dfdfdsdfsd`);
    console.log(result.body);
    expect(result.headers['x-error']).to.be.equal('invalid.id.params');
    expect(result.status).to.be.equal(400);
  });
  it('not found user', async () => {
    const { id } = await addUser();
    await User.delete({ _id: id });
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/users/${id}`);
    console.log(result.body);
    expect(result.headers['x-error']).to.be.equal('user.not.found');
    expect(result.status).to.be.equal(404);
  });
  it('find user with username', async () => {
    const { username, id } = await addUser();
    const result = await chai.request(app)
      .get(`${URI_PREFIX}/users/${id}`);
    console.log(result.body);
    expect(result.body.user.username).to.be.equal(username);
    expect(result.status).to.be.equal(200);
  })
});

describe('delete User', () => {
  it('not valid id', async () => {
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/users/${1234567}`);
    console.log(result.body);
    expect(result.headers['x-error']).to.be.equal('invalid.id.params');
    expect(result.status).to.be.equal(400);
  });
  it('not found user', async () => {
    const { id } = await addUser();
    await User.delete(id);
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/users/${id}`);
    console.log(result.body);
    expect(result.headers['x-error']).to.be.equal('user.not.found');
    expect(result.status).to.be.equal(404);
  });
  it('delete user', async () => {
    const { id } = await addUser();
    const users = await User.getAll();
    const size = users.length;
    console.log(users.length);
    const result = await chai.request(app)
      .delete(`${URI_PREFIX}/users/${id}`);
    const usersAfterDelete = await User.getAll();
    console.log(usersAfterDelete.length);
    const sizeAfterDelete = usersAfterDelete.length;
    console.log(result.body);
    expect(size - 1).to.be.equal(sizeAfterDelete);
    expect(result.status).to.be.equal(204);
    expect(result.headers['x-code']).to.be.equal('success.delete.user');
  });
});

after(async () => {
  await User.deleteAll();
  process.exit();
});
