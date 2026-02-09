import express from 'express';
import ResaleProductController from '../../controllers/Resale/ResaleProductController';
import { protect } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', ResaleProductController.getProducts);
router.get('/:id', ResaleProductController.getProductById);
router.post('/', protect, ResaleProductController.createProduct);
router.put('/:id', protect, ResaleProductController.updateProduct);
router.delete('/:id', protect, ResaleProductController.deleteProduct);

export default router;
