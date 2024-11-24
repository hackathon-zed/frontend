"use client"
import { IProduct } from '@/components/shared/Arts';
import { Types } from 'mongoose';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

// Mock API URL for product fetching
const API_URL = 'http://localhost:3000/api/store/get-products';

export default function StoreDashboard() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from API on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err: any) {
                // setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // Function to handle adding a product (showing the form)
    const handleAddProduct = () => {
        // Redirect to add product page (you can create this page)
        window.location.href = '/add-product';
    };

    return (
        <div className=" bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Store Dashboard</h1>



            <div className="flex justify-end mb-4">
                <Link href="/store/addproduct" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add Product</Link>
            </div>

            {loading ? (
                <div>Loading products...</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Product Name</th>
                                <th className="px-4 py-2 border-b">Price</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>

                    </table>
                </div>
            )}
        </div>
    );
}
