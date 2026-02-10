import WholesaleProduct, { IWholesaleProduct } from '../../models/Wholesale/WholesaleProductModel';

const getAllWholesaleProducts = async (): Promise<IWholesaleProduct[]> => {
    return await WholesaleProduct.find().populate('seller', 'username email');
};

const createWholesaleProduct = async (data: Partial<IWholesaleProduct>): Promise<IWholesaleProduct> => {
    const product = new WholesaleProduct(data);
    return await product.save();
};

const getWholesaleProductById = async (id: string): Promise<IWholesaleProduct | null> => {
    return await WholesaleProduct.findById(id).populate('seller', 'username email');
};

const updateWholesaleProduct = async (id: string, data: Partial<IWholesaleProduct>): Promise<IWholesaleProduct | null> => {
    return await WholesaleProduct.findByIdAndUpdate(id, data, { new: true });
};

const deleteWholesaleProduct = async (id: string): Promise<IWholesaleProduct | null> => {
    return await WholesaleProduct.findByIdAndDelete(id);
};

const getWholesaleProductsBySeller = async (sellerId: string): Promise<IWholesaleProduct[]> => {
    return await WholesaleProduct.find({ seller: sellerId }).populate('seller', 'username email');
};

export default {
    getAllWholesaleProducts,
    createWholesaleProduct,
    getWholesaleProductById,
    updateWholesaleProduct,
    deleteWholesaleProduct,
    getWholesaleProductsBySeller
};
