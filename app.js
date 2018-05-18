import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controllers/User';

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const user = new UserController(req, res);
  console.log('params', req.query, 'users', user.getAll());
  const result = await user.getAll();
  console.log('params', req.query);
  res.send({ message: `HELLO GUYS I AM HERE ${result}` });
});
export default app;
