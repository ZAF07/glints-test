import express from 'express';
import {} from 'dotenv/config';

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
});

app.listen(process.env.LOCAL || process.env.PORT);