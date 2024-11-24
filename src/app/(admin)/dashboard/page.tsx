"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { useEffect, useState } from "react";
import { Types } from "mongoose";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [user, setUser] = useState<ICustomer>()




  useEffect(() => {
    // Get the query parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const userParam = searchParams.get("customer"); // This is the stringified user object

    if (userParam) {
      try {
        // Parse the JSON string into an object
        const userObject = JSON.parse(userParam);
        setUser(userObject);
      } catch (error) {
        console.error("Failed to parse user object:", error);
      }
    }
  }, []);

  console.log("user", user);






  if (!sidebar) return null;


  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-6 bg-white shadow-md rounded-lg">
        {/* User Info Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cart Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Your Cart</h3>
            <p className="text-gray-600">Items in your cart: 3</p>
            <Link href="/cart" className="text-blue-600 hover:text-blue-800 mt-2 block">
              View Cart
            </Link>
          </div>

          {/* Orders Section */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-600">Your Orders</h3>
            <p className="text-gray-600">Recent Orders: 2</p>
            <Link href="/dashboard/orders" className="text-green-600 hover:text-green-800 mt-2 block">
              View Orders
            </Link>
          </div>

          {/* Wishlist Section */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-600">Your Wishlist</h3>
            <p className="text-gray-600">Wishlist Items: 5</p>
            <Link href="/wishlist" className="text-yellow-600 hover:text-yellow-800 mt-2 block">
              View Wishlist
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Account Settings</h3>
          <div className="mt-4">
            <Link href="/profile" className="text-blue-600 hover:text-blue-800">
              Edit Profile
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/change-password" className="text-blue-600 hover:text-blue-800">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}





export interface ICustomer {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  passwordHash?: string;
  phone?: string;
  role: string;                   // enum ["customer", "admin", "superadmin"]
  metadata: IMetadata;
  preferences: IPreferences;
  wishlist?: Types.ObjectId[];    // Reference to products
  orders?: Types.ObjectId[];      // Reference to orders
  cart: ICartItem[];              // Array of cart items
  createdAt: Date;
  updatedAt: Date;
}

export interface IMetadata {
  googleId?: string;                  // Optional, for Google users
  facebookId?: string;                // Optional, for Facebook users
  phoneVerified?: boolean;            // Indicates if phone number is verified
  emailVerified?: boolean;            // Indicates if email is verified
  provider: "google" | "facebook" | "phone" | "local"; // Enum for authentication providers
  profileImageUrl?: string;           // Optional, URL to profile image
}


export interface ICartItem {
  productId: Types.ObjectId;           // Reference to the product
  quantity: number;                    // Quantity of the product
  priceAtAdded: number;                // Price when the product was added to the cart
  addedAt: Date;                       // Timestamp of when the item was added
}
export interface IPreferences {
  communicationMethod: 'email' | 'sms' | 'phone';  // Preferred communication method
  theme: 'light' | 'dark';                        // Preferred theme
  notificationPreferences: {
    orderUpdates: boolean;                       // Notify customer about order updates
    promotions: boolean;                         // Notify customer about promotions
    reminders: boolean;                     // Notify customer about reminders for appointments
  }
}