import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { productService } from "../services/product.service.js"

const addProduct = asyncHandler(async(req, res) => {
    const sellerId = req.user?.id
    const product = await productService.addProduct(sellerId, req.body);

    return res.status(200).json(new ApiResponse(200, {product}, "Product added in inventory"));
});

const deleteProduct = asyncHandler(async(req, res) => {
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);

    return res.status(200).json(new ApiResponse(200, {deletedProduct}, "Product deleted successfully"));
});

const updateProduct = asyncHandler(async(req, res) => {
    const productId = req.params.id
    const updatedProduct = await productService.updateProduct(productId, req.body);

    return res.status(200).json(new ApiResponse(200, {updatedProduct}, "Product updated successfully"));
});

const getAllProducts = asyncHandler(async(req, res) => {
    const {page, limit, total, products} = await productService.getAllProducts()

    const meta = {page, limit, total};

    const message = total === 0 ? "No products available in the catalog" : "Products retrieved from database"

    return res.status(200).json(new ApiResponse(200, {products}, message, meta));
});

const getProductById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const product = await productService.getProductById(id)

    return res.status(200).json(new ApiResponse(200, {product}, "Product details fetched successfully"));
})

const getProductsByCategory = asyncHandler(async(req, res) => {
    const category = req.query.catergory;
    const {products, page, limit, total} = await productService.getProductsByCategory(category)

    const meta = {page, limit, total};

    return res.status(200).json(new ApiResponse(200, {products}, "Products successfully fetched for the selected category", meta));
})

const searchProductsWithCategory = asyncHandler(async(req, res) => {
    const productName = req.query.productName;

    const {searchResults, relatedCategoryResults, meta} = await productService.searchProductsWithCategory(productName)

    const results = {searchResults, relatedCategoryResults}

    const message = searchResults.length === 0 ? "No products found matching your search" : "Products matching search retrieved successfully";

    return res.status(200).json(new ApiResponse(200, {results}, message, meta));
})


export const productController = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProductsWithCategory
}