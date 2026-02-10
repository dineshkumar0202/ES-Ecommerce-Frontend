import express from 'express';
import WholesaleProductController from '../../controllers/Wholesale/WholesaleProductController';
import { protect } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', WholesaleProductController.getProducts);
router.get('/my-products', protect, WholesaleProductController.getSellerProducts);
router.get('/:id', WholesaleProductController.getProductById);
router.post('/', protect, WholesaleProductController.createProduct);
router.put('/:id', protect, WholesaleProductController.updateProduct);
router.delete('/:id', protect, WholesaleProductController.deleteProduct);

export default router;
