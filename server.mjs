import express from 'express';
import {} from 'dotenv/config';

import restaurantOpeningTime from './routes/apiRoutes.mjs' 

const app = express()
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({message: 'Hello welcome!', APIKEY: 'apiKey'});
});
 
app.use('/api', restaurantOpeningTime);

app.listen(process.env.PORT || 3000);