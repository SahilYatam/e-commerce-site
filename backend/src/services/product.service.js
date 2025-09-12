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

const getProductById = async(id) => {
    const product = await Product.findById(id)
    if(!product) throw new ApiError(404, "Product not found");

    return product
}

const getProductsByCategory = async (category) => {
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({category}).skip(skip).limit(limit);
    const total = await Product.countDocuments({category});
    
    return {page, limit, total, products};
}

const searchProducts = async(productName) => {
    const name = productName.toLowerCase().trim()
    
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchResults = await Product.find({productName: {$regex: name, $options: "i"}}).skip(skip).limit(limit)

    const totalSearch = await Product.countDocuments({productName: {$regex: name, $options: "i"}})

    return {searchResults, page, limit, totalSearch};
}

const searchProductsWithCategory = async (productName) => {
    // get search results
    const {searchResults, page, limit, totalSearch} = await searchProducts(productName);

    // if results found then get the category
    let relatedCategoryResults = [];
    if(searchResults.length > 0) {
        const firstCategory = searchResults[0].category

        relatedCategoryResults = await Product.find({
            category: firstCategory,
            _id: {$nin: searchResults.map(product => product._id)}
        }).limit(limit)
    }

    const meta = {
        page,
        total: totalSearch,
        searchCount: searchResults.length,
        relatedCount: relatedCategoryResults.length,
    }

    return {searchResults, relatedCategoryResults, meta}
}

export const productService = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProductsWithCategory
}