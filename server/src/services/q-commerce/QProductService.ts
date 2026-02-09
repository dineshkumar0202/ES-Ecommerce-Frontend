import QProduct, { IQProduct } from '../../models/q-commerce/QProductModel';

const getAllQProducts = async (): Promise<IQProduct[]> => {
    return await QProduct.find();
};

const createQProduct = async (data: Partial<IQProduct>): Promise<IQProduct> => {
    const product = new QProduct(data);
    return await product.save();
};

const getQProductById = async (id: string): Promise<IQProduct | null> => {
    return await QProduct.findById(id);
};

const updateQProduct = async (id: string, data: Partial<IQProduct>): Promise<IQProduct | null> => {
    return await QProduct.findByIdAndUpdate(id, data, { new: true });
};

const deleteQProduct = async (id: string): Promise<IQProduct | null> => {
    return await QProduct.findByIdAndDelete(id);
};

export default {
    getAllQProducts,
    createQProduct,
    getQProductById,
    updateQProduct,
    deleteQProduct
};
