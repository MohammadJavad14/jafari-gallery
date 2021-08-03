import express from 'express';
const router = express.Router();
import {
    getProductById,
    getProducts,
    deleteProduct,
    UpdateProduct,
    crateProduct,
    createProductReview,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, crateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, UpdateProduct);

export default router;