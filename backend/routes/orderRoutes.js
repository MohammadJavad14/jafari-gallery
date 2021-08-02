import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    payCallback,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);
router.route('/:id/paycallback').get(protect, payCallback);

export default router;