import ResaleProduct, { IResaleProduct } from '../../models/resale/ResaleProductModel';

const getAllResaleProducts = async (): Promise<IResaleProduct[]> => {
    return await ResaleProduct.find().populate('seller', 'username email');
};

const createResaleProduct = async (data: Partial<IResaleProduct>): Promise<IResaleProduct> => {
    const product = new ResaleProduct(data);
    return await product.save();
};

const getResaleProductById = async (id: string): Promise<IResaleProduct | null> => {
    return await ResaleProduct.findById(id).populate('seller', 'username email');
};

const updateResaleProduct = async (id: string, data: Partial<IResaleProduct>): Promise<IResaleProduct | null> => {
    return await ResaleProduct.findByIdAndUpdate(id, data, { new: true });
};

const deleteResaleProduct = async (id: string): Promise<IResaleProduct | null> => {
    return await ResaleProduct.findByIdAndDelete(id);
};

export default {
    getAllResaleProducts,
    createResaleProduct,
    getResaleProductById,
    updateResaleProduct,
    deleteResaleProduct
};
