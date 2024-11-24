"use client"

import { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import axios from 'axios';

export default function Arts() {
  const [selectedCategory, setSelectedCategory] = useState("Bharni");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Bharni", "Katchni", "Tantrik", "Godna", "Kohbar"]);

  // Fetch products on category change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/product/all`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  console.log("products", products);

  return (
    <Container className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Explore Arts</h1>
        <Link
          href="/all-products"
          className="text-teal-500 hover:text-teal-600"
        >
          See All →
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap pb-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? "default" : "secondary"}
            className="whitespace-nowrap"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: IProduct) => (
          <div
            className="border rounded-lg p-4 min-w-[300px] sm:w-full relative mx-auto"
          >
            {product.isOnSale && product.salePrice && (
              <Badge
                variant="default"
                className="absolute top-6 right-6 z-10"
              >
                10% OFF
              </Badge>
            )}
            <div className="aspect-square mb-4 relative">
              <Image
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
                width={400}
                height={400}
              />
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>

            <div className="flex justify-between items-center">
              <div>
                {product.isOnSale && product.salePrice ? (
                  <>
                    <span className="text-sm text-gray-500 line-through mr-2">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-red-500 font-semibold">
                      ${product.salePrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-red-500 font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <Button
                size="icon"
                className="rounded-full bg-teal-500 hover:bg-teal-600"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}


import { Types } from "mongoose";

// Main Product Interface
export interface IProduct {
  name: string;                       // Product name
  description: string;                // Detailed product description
  price: number;                      // Product price
  stock: number;                      // Number of items in stock
  images: IProductImage[];            // Array of product images
  ratings: Types.ObjectId[];          // Customer ratings
  createdAt: Date;                    // Timestamp for product creation
  updatedAt: Date;                    // Timestamp for last update
  isActive: boolean;                  // Flag to indicate if the product is active
  isFeatured: boolean;                // Flag to indicate if the product is featured
  isOnSale: boolean;                  // Flag to indicate if the product is on sale
  salePrice?: number;                 // Sale price (if applicable)
  saleStartDate?: Date;               // Sale start date (if applicable)
  saleEndDate?: Date;                 // Sale end date (if applicable)
  sku: string;                        // Product SKU (Stock Keeping Unit)
  tax: number;                        // Tax percentage
  shippingCost: number;                   // Shipping cost
}


// Product Image Interface
export interface IProductImage {
  url: string;                        // Image URL
  altText: string;                    // Alt text for image
  isPrimary: boolean;                 // Flag to indicate primary image
}

export interface IProductAttribute {
  key: string;                       // Attribute name
  value: string;                      // Attribute value
}

