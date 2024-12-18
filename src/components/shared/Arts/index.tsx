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

<<<<<<< HEAD
  const products = [
    {
      id: 1,
      name: "Painting",
      slug: "painting",
      image: "/bharni1.jpg",
      price: 250.0,
      rating: 4,
      badge: { text: "NEW", variant: "default" },
      category: "Bharni",
    },
    {
      id: 2,
      name: "Painting",
      slug: "painting",
      image: "/bharni2.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "HOT", variant: "destructive" },
      category: "Katchni",
    },
    {
      id: 3,
      name: "Painting",
      slug: "painting",
      image: "/bharni7.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "OUT OF STOCK", variant: "secondary" },
      category: "Tantrik",
    },
    {
      id: 4,
      name: "Painting",
      slug: "painting",
      image: "/bharni8.jpg",
      originalPrice: 250.0,
      price: 190.0,
      rating: 4,
      badge: { text: "10% OFF", variant: "default" },
      category: "Godna",
    },
    {
      id: 5,
      name: "Sculpture",
      slug: "sculpture",
      image: "/bharni1.jpg",
      price: 300.0,
      rating: 5,
      badge: { text: "NEW", variant: "default" },
      category: "Bharni",
    },
    {
      id: 6,
      name: "Vase",
      slug: "vase",
      image: "/art.jpeg",
      price: 150.0,
      rating: 3,
      badge: { text: "SALE", variant: "warning" },
      category: "Katchni",
    },
    {
      id: 7,
      name: "Mural",
      slug: "mural",
      image: "/art.jpeg",
      price: 500.0,
      rating: 4,
      badge: { text: "LIMITED", variant: "secondary" },
      category: "Tantrik",
    },
    {
      id: 8,
      name: "Tapestry",
      slug: "tapestry",
      image: "/art.jpeg",
      price: 200.0,
      rating: 4,
      badge: { text: "HOT", variant: "destructive" },
      category: "Godna",
    },
    {
      id: 9,
      name: "Statue",
      slug: "statue",
      image: "/art.jpeg",
      price: 400.0,
      rating: 5,
      badge: { text: "NEW", variant: "default" },
      category: "Kohbar",
    },
    {
      id: 10,
      name: "Painting",
      slug: "painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "NEW", variant: "default" },
      category: "Bharni",
    },
    {
      id: 11,
      name: "Painting",
      slug: "painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "HOT", variant: "destructive" },
      category: "Katchni",
    },
    {
      id: 12,
      name: "Painting",
      slug: "painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "OUT OF STOCK", variant: "secondary" },
      category: "Tantrik",
    },
    {
      id: 13,
      name: "Painting",
      slug: "painting",
      image: "/art.jpeg",
      originalPrice: 250.0,
      price: 190.0,
      rating: 4,
      badge: { text: "10% OFF", variant: "default" },
      category: "Godna",
    },
  ];
=======
>>>>>>> e63bf5fc7ca7a94bccbb6bc7f6c17de9accc30e5

  console.log("products", products);

  return (
    <Container className="px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary mb-2 md:mb-0">
          Explore Arts
        </h1>
        <Link
          href="/all-products"
          className="text-teal-500 hover:text-teal-600 text-lg"
        >
          See All →
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap pb-4 mb-8 justify-center items-center mx-auto">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={
              category.name === selectedCategory ? "default" : "secondary"
            }
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setSelectedCategory(category.name)}

            key={category}
            variant={category === selectedCategory ? "default" : "secondary"}
            className="whitespace-nowrap"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 min-w-[300px] sm:w-full relative mx-auto transition-transform transform hover:scale-105"
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

    </Container>
  );
}
