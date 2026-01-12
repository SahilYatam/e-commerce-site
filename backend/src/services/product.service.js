import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/responses/ApiError.js";

const addProduct = async (sellerId, imageUrl, data) => {
    const seller = await User.findById(sellerId.toString());
    if (!seller) throw new ApiError(404, "Seller not found");

    const { productName, price, description, category, stock } = data;

    const product = new Product({
        sellerId: seller._id,
        productImage: imageUrl,
        productName,
        price: Number(price),
        description,
        category,
        stock,
    });

    await product.save();

    return product;
};

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new ApiError(404, "Product not found");

    return { message: "Product deleted successfully" };
};

const updateProduct = async (productId, data) => {
    const allowedFields = ["productName", "price", "description", "category"];
    let updates = {};

    for (let key of allowedFields) {
        if (key in data) {
            updates[key] = data[key];
        }
    }

    if (Object.keys(updates).length === 0) {
        return { message: "No fields provided for update." };
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!product) throw new ApiError(404, "Product not found");

    return product;
};

const getAllProducts = async ({ page = 1, limit = 10 } = {}) => {
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        Product.find(
            {},
            {
                productName: 1,
                price: 1,
                productImage: 1,
                category: 1,
                stock: 1,
                createdAt: 1
            }
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

        Product.countDocuments()
    ]);

    return {
        page,
        limit,
        total,
        products
    };
};



const getProductById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(
        id,
        {
            productName: 1,
            price: 1,
            productImage: 1,
            description: 1,
            category: 1,
            stock: 1,
            sellerId: 1,
            createdAt: 1
        }
    ).lean();

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return product;
};

const getProductsByCategory = async (category) => {
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category })
        .skip(skip)
        .limit(limit)
        .lean();
    const total = await Product.countDocuments({ category });

    return { page, limit, total, products };
};

const searchProducts = async (productName) => {
    const name = productName.toLowerCase().trim();

    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchResults = await Product.find({
        productName: { $regex: name, $options: "i" },
    })
        .skip(skip)
        .limit(limit)
        .lean();

    const totalSearch = await Product.countDocuments({
        productName: { $regex: name, $options: "i" },
    });

    return { searchResults, page, limit, totalSearch };
};

const searchProductsWithCategory = async (productName) => {
    if (!productName || productName.trim() === "") {
        throw new ApiError(400, "Search query cannot be empty");
    }
    // get search results
    const { searchResults, page, limit, totalSearch } = await searchProducts(
        productName
    );

    // if results found then get the category
    let relatedCategoryResults = [];
    if (searchResults.length > 0) {
        const firstCategory = searchResults[0].category;

        relatedCategoryResults = await Product.find({
            category: firstCategory,
            _id: { $nin: searchResults.map((product) => product._id) },
        }).limit(limit);
    }

    const meta = {
        page,
        total: totalSearch,
        searchCount: searchResults.length,
        relatedCount: relatedCategoryResults.length,
    };

    return { searchResults, relatedCategoryResults, meta };
};

export const productService = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    searchProductsWithCategory,
};
