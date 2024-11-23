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
      {/* Hello {user.profile.displayName} */}
    </ContentLayout>
  );
}
