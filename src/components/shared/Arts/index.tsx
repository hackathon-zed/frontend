"use client";

import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";

export default function Arts() {
  const [selectedCategory, setSelectedCategory] = useState("Bharni");

  const categories = [
    { name: "Bharni", active: true },
    { name: "Katchni", active: false },
    { name: "Tantrik", active: false },
    { name: "Godna", active: false },
    { name: "Kohbar", active: false },
  ];

  const products = [
    {
      id: 1,
      name: "Painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "NEW", variant: "default" },
      category: "Bharni",
    },
    {
      id: 2,
      name: "Painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "HOT", variant: "destructive" },
      category: "Katchni",
    },
    {
      id: 3,
      name: "Painting",
      image: "/art.jpeg",
      price: 250.0,
      rating: 4,
      badge: { text: "OUT OF STOCK", variant: "secondary" },
      category: "Tantrik",
    },
    {
      id: 4,
      name: "Painting",
      image: "/art.jpeg",
      originalPrice: 250.0,
      price: 190.0,
      rating: 4,
      badge: { text: "10% OFF", variant: "default" },
      category: "Godna",
    },
    {
      id: 5,
      name: "Sculpture",
      image: "/art.jpeg",
      price: 300.0,
      rating: 5,
      badge: { text: "NEW", variant: "default" },
      category: "Bharni",
    },
    {
      id: 6,
      name: "Vase",
      image: "/art.jpeg",
      price: 150.0,
      rating: 3,
      badge: { text: "SALE", variant: "warning" },
      category: "Katchni",
    },
    {
      id: 7,
      name: "Mural",
      image: "/art.jpeg",
      price: 500.0,
      rating: 4,
      badge: { text: "LIMITED", variant: "secondary" },
      category: "Tantrik",
    },
    {
      id: 8,
      name: "Tapestry",
      image: "/art.jpeg",
      price: 200.0,
      rating: 4,
      badge: { text: "HOT", variant: "destructive" },
      category: "Godna",
    },
    {
      id: 9,
      name: "Statue",
      image: "/art.jpeg",
      price: 400.0,
      rating: 5,
      badge: { text: "NEW", variant: "default" },
      category: "Kohbar",
    },
  ];

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

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
            key={category.name}
            variant={
              category.name === selectedCategory ? "default" : "secondary"
            }
            className="whitespace-nowrap"
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 min-w-[300px] sm:w-full relative mx-auto"
          >
            {product.badge && (
              <Badge
                variant={
                  product.badge.variant as
                    | "default"
                    | "destructive"
                    | "secondary"
                    | "outline"
                }
                className="absolute top-6 right-6 z-10"
              >
                {product.badge.text}
              </Badge>
            )}
            <div className="aspect-square mb-4 relative">
              <Image
                fill
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through mr-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-red-500 font-semibold">
                  ${product.price.toFixed(2)}
                </span>
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
