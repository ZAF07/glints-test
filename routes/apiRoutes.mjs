import express from 'express';

import {
  getRestaurantOpeningTime,
  getRestaurantsAndDishes,
  getRestaurantsOrDishes,
  processPurchase
} from '../controllers/apiControllers.mjs';

const router = express.Router();

router.get('/open-time', getRestaurantOpeningTime);
router.get('/restaurants-and-dishes', getRestaurantsAndDishes);
router.get('/restaurants-or-dishes', getRestaurantsOrDishes);
router.post('/purchase', processPurchase);

export default router;