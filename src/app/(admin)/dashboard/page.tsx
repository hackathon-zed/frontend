<<<<<<< HEAD
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the query parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const userParam = searchParams.get("name"); // This is the stringified user object

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
  if (!sidebar) return null;
  console.log(user);
  const { settings, setSettings } = sidebar;
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
      Hello {user.profile.displayName}
    </ContentLayout>
  );
}
=======
"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Extract query parameters using useSearchParams
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (name && email) {
      setUser({ name, email });
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: <strong>{user.email}</strong></p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Dashboard;
>>>>>>> 981834c075ec312daa6609d8685a4319dfc9487d
