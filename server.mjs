import express from 'express';
import db from './model/models/index.mjs'
import Sequelize from 'sequelize';
import {} from 'dotenv/config';

const Op = Sequelize.Op;

import restaurantOpeningTime from './routes/openTiming.mjs' 

const app = express()



app.get('/', (req, res) => {
  res.send('hello')
});

// GET: List all restaurants that are open at a certain datetime 
app.use('/api/get-open-time', restaurantOpeningTime);


app.listen(process.env.LOCAL || process.env.PORT);