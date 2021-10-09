import express from 'express';

import {
  getRestaurantOpeningTime,
  getRestaurantsAndDishes,
  getRestaurantsOrDishes
} from '../controllers/openTimingController.mjs';

const router = express.Router();

router.get('/open-time', getRestaurantOpeningTime);
router.get('/restaurants-and-dishes', getRestaurantsAndDishes);
router.get('/restaurants-or-dishes', getRestaurantsOrDishes);

export default router;