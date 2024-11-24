"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PenSquare, Trash2, Save, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ICustomer } from "@/interfaces";

const SellerProfileSettings = () => {
  // get user from url search params
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  console.log("user from backend", user);

  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [profile, setProfile] = useState({
    storeName: "My Awesome Store",
    ownerName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Market Street, San Francisco, CA 94105",
    description:
      "We sell high-quality handcrafted items made with love and care.",
    taxId: "TAX123456789",
    bankAccount: "****-****-****-1234",
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const createNewUser = (): ICustomer => {
    const newUser: ICustomer = {
      name: "New User",
      email: "newuser@example.com",
      passwordHash: "hashed-password", // Hash the password
      phone: "+1 (555) 987-6543",
      role: "customer",
      businessName: "New User Business",
      businessType: "Retail",
      metadata: {
        provider: "local",
        emailVerified: false,
        phoneVerified: false,
      },
      preferences: {
        communicationMethod: "email",
        theme: "light",
        notificationPreferences: {
          orderUpdates: true,
          promotions: true,
          reminders: true,
        },
      },
      wishlist: [],
      orders: [],
      cart: [],
    };

    return newUser;
  };

  const newUser = createNewUser();
  console.log(newUser);

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    showNotification("Profile updated successfully!");
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your seller profile? This action cannot be undone."
      )
    ) {
      // In a real application, you would make an API call here
      showNotification("Profile deleted successfully!");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    disabled: boolean;
  }

  const FormField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    disabled,
  }: FormFieldProps) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {showAlert && (
        <Alert className="mb-4">
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Seller Profile Settings</CardTitle>
          <CardDescription>
            Manage your seller profile information and settings
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <FormField
              label="Store Name"
              name="storeName"
              value={isEditing ? tempProfile.storeName : profile.storeName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Owner Name"
              name="ownerName"
              value={isEditing ? tempProfile.ownerName : profile.ownerName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={isEditing ? tempProfile.email : profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Phone"
              name="phone"
              value={isEditing ? tempProfile.phone : profile.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Address"
              name="address"
              type="textarea"
              value={isEditing ? tempProfile.address : profile.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Store Description"
              name="description"
              type="textarea"
              value={isEditing ? tempProfile.description : profile.description}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Tax ID"
              name="taxId"
              value={isEditing ? tempProfile.taxId : profile.taxId}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormField
              label="Bank Account"
              name="bankAccount"
              value={isEditing ? tempProfile.bankAccount : profile.bankAccount}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {!isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex items-center gap-2"
              >
                <PenSquare className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Profile
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerProfileSettings;
