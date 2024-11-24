"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Icons } from "@/components/shared/icons";

const Signup = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  return (
    <div className="mx-auto max-w-lg space-y-8 py-10">
      <Card className="overflow-hidden">
        <Tabs defaultValue={type ?? "register"}>
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger
              value="login"
              onClick={() => router.push("/auth?type=login")}
              className="rounded-b-none rounded-t-lg"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => router.push("/auth?type=register")}
              className="rounded-b-none rounded-t-lg"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader className="flex items-center space-y-1">
              <CardTitle className="h3">Welcome Back</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="relative">
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    Continue with
                  </span>
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader className="flex items-center space-y-1">
              <Image
                src="/logo.png"
                alt="MITHILA LEGACY"
                width={1000}
                height={1000}
                className="w-28"
              />
              <CardTitle className="h3">Create an account</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="relative">
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    Continue with
                  </span>
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Signup;
