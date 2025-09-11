import { Product } from "../models/product.model.js"

import { ApiError } from "../utils/responses/ApiError.js"

const addProduct = async(sellerId, data) => {
    const seller = await Product.findById(sellerId);
    if(!seller) throw new ApiError(404, "Seller not found");

    const product = new Product({
        sellerId: seller._id,
        productName: data.productName,
        productImage: data.productImage,
        price: data.price,
        description: data.description,
        category: data?.category
    });

    await product.save();

    return product
}

const deleteProduct = async(productId) => {
    const product = await Product.findByIdAndDelete(productId)
    if(!product) throw new ApiError(404, "Product not found");
    
    return {deletedProduct: product};
}

const updateProduct = async(productId, data) => {
    const allowedFields = ["productName", "price", "description", "category"]
    let updates = {}

    // collect only allowed + provided fields
    for(let key of allowedFields){
        if(key in data) {
            updates[key] = data[key]
        }
    }

    // if no valid updates, return message
    if(Object.keys(updates).length === 0){
        return {message: "No fields provided for update."};
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {$set: updates},
        {new: true, runValidators: true}
    )

    if(!product) throw new ApiError(404, "Product not found");

    return product;
}

const getAllProducts = async () => {
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);

    const total = await Product.countDocuments({});

    return {page, limit, total, products};
}


export const productService = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
}