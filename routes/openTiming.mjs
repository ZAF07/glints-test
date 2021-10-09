import express from 'express';

import {
  getRestaurantOpeningTime,
  getRestaurantsAndDishes
} from '../controllers/openTimingController.mjs';

const router = express.Router();

router.get('/open-time', getRestaurantOpeningTime);
router.get('/restaurants-and-dishes', getRestaurantsAndDishes);

export default router;