import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    payCallback,
    updateOrderToPaid,
    getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(protect, updateOrderToPaid);
router.route('/:id/paycallback').get(protect, payCallback);

export default router;