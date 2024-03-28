import express from 'express';
import DB from './config/db';
require('dotenv').config();
import user from './routes/authentication';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  DB.connected()
    .then((res) => {
      console.log("DB connection successful -----");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
  console.log(`Server is running on port ${PORT}`);
  });

  app.get('/test', (req, res) => {
    res.json({"hello": "world"})
  })
  
// ..... Routes ......
app.use('/user', user);

export default app;
