"use client";
import React, { useState } from "react";
import { IProduct } from "@/components/shared/Arts";

const API_URL = "http://localhost:3000/api/v1/product/create";

const initialProductState: IProduct = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    ratings: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    salePrice: 0,
    saleStartDate: undefined,
    saleEndDate: undefined,
    sku: "",
    tax: 0,
    shippingCost: 0,
};

export default function AddProduct() {
    const [product, setProduct] = useState<IProduct>(initialProductState);
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "stock" || name === "tax" || name === "shippingCost"
                    ? parseFloat(value)
                    : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price.toString());
            formData.append("description", product.description);
            formData.append("stock", product.stock.toString());
            formData.append("sku", product.sku);
            formData.append("tax", product.tax.toString());
            formData.append("shippingCost", product.shippingCost.toString());
            formData.append("isActive", product.isActive.toString());
            formData.append("isFeatured", product.isFeatured.toString());
            formData.append("isOnSale", product.isOnSale.toString());
            formData.append("saleStartDate", product.saleStartDate?.toISOString() || "");
            formData.append("saleEndDate", product.saleEndDate?.toISOString() || "");
            formData.append("ratings", JSON.stringify(product.ratings));
            formData.append("createdAt", product.createdAt.toISOString());
            formData.append("updatedAt", product.updatedAt.toISOString());


            // Append each image
            images.forEach((image) => {
                formData.append("images", image);
            });

            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            setSuccessMessage("Product added successfully!");
            setProduct(initialProductState);
            setImages([]);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
            <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-6">Add New Product</h1>

            {error && <div className="text-red-600 mb-4 text-center bg-red-100 p-3 rounded">{error}</div>}
            {successMessage && (
                <div className="text-green-600 mb-4 text-center bg-green-100 p-3 rounded">
                    {successMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto border border-gray-200"
            >
                <div className="mb-6">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                        Product Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">
                        Price
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                        rows={4}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="stock" className="block text-lg font-medium text-gray-700 mb-2">
                        Stock
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={product.stock}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="sku" className="block text-lg font-medium text-gray-700 mb-2">
                        SKU
                    </label>
                    <input
                        id="sku"
                        name="sku"
                        type="text"
                        value={product.sku}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">
                        Images
                    </label>
                    <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
