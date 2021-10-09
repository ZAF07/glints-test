import express from 'express';

import getRestaurantOpeningTime from '../controllers/openTimingController.mjs';

const router = express.Router();

router.get('/:key', getRestaurantOpeningTime);

export default router;