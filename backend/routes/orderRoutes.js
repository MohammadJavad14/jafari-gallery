import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    payCallback,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(updateOrderToPaid);
router.route('/:id/paycallback').get(payCallback);

export default router;