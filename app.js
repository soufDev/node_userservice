import express from 'express';
import bodyParser from 'body-parser';
import models from './models/index';

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const result = await models.user.findAll();
  console.log('params', req.query);
  res.send({ message: `HELLO GUYS I AM HERE ${result}` });
});
export default app;
