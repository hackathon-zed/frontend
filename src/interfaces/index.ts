export interface ICustomer {
  name: string;
  email?: string;
  passwordHash?: string;
  businessName: string;
  businessType: string;
  phone?: string;
  role: string; // enum ["customer", "admin", "superadmin"]
  metadata: IMetadata;
  preferences: IPreferences;
  wishlist?: string[]; // Reference to products
  orders?: string[]; // Reference to orders
  cart: ICartItem[];
}

export interface IMetadata {
  googleId?: string; // Optional, for Google users
  facebookId?: string; // Optional, for Facebook users
  phoneVerified?: boolean; // Indicates if phone number is verified
  emailVerified?: boolean; // Indicates if email is verified
  provider: "google" | "facebook" | "phone" | "local"; // Enum for authentication providers
  profileImageUrl?: string; // Optional, URL to profile image
}

export interface ICartItem {
  productId: string; // Reference to the product
  quantity: number; // Quantity of the product
  priceAtAdded: number; // Price when the product was added to the cart
  addedAt: Date; // Timestamp of when the item was added
}

export interface IPreferences {
  communicationMethod: "email" | "sms" | "phone"; // Preferred communication method
  theme: "light" | "dark"; // Preferred theme
  notificationPreferences: {
    orderUpdates: boolean; // Notify customer about order updates
    promotions: boolean; // Notify customer about promotions
    reminders: boolean; // Notify customer about reminders for appointments
  };
}
export interface IFaq {
  _id: string; // MongoDB ObjectId
  question: string;
  answer: string;
}
