import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/UserRoutes';
import dbConnection from './core/config/dbConfig';

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database
dbConnection();

app.use('/api/v1/', userRouter);
app.get('/', async (req, res) => {
  res.send({ message: 'HELLO GUYS I AM HERE' });
});
export default app;
