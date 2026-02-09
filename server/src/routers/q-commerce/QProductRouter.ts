import express from 'express';
import QProductController from '../../controllers/Q-commerce/QProductController';
import { protect, admin } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', QProductController.getProducts);
router.get('/:id', QProductController.getProductById);
router.post('/', protect, admin, QProductController.createProduct);
router.put('/:id', protect, admin, QProductController.updateProduct);
router.delete('/:id', protect, admin, QProductController.deleteProduct);

export default router;
