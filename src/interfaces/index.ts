export interface ICustomer {
  name: string;
  email?: string;
  phone?: string;
  role: "admin" | "customer" | "superadmin" | "staff" | "manager";
  metadata: {
    googleId?: string;
    facebookId?: string;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    provider: "google";
    profileImageUrl?: string;
  };
  preferences: {
    communicationMethod: "email" | "sms" | "phone";
    theme: "light" | "dark";
    notificationPreferences: {
      orderUpdates: boolean;
      promotions: boolean;
      reminders: boolean;
    };
  };
  orders?: {
    _id: string;
    productId: string;
    productName: string;
    customerId: string;
    date: Date;
  }[];
  reviews?: {
    _id: string;
    rating: number;
    comment: string;
    date: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFaq {
  _id: string; // MongoDB ObjectId
  question: string;
  answer: string;
}
