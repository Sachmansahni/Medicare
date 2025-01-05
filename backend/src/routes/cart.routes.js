import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verifyJWT, getCart);
router.post('/add', verifyJWT, addToCart);
router.delete('/:medicineId', verifyJWT, removeFromCart);

export default router;
