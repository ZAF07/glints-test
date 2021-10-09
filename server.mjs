import express from 'express';
import {} from 'dotenv/config';

import restaurantOpeningTime from './routes/openTiming.mjs' 

const app = express()
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('hello')
});

// GET: List all restaurants that are open at a certain datetime 
app.use('/api', restaurantOpeningTime);


app.listen(process.env.PORT || 3000);