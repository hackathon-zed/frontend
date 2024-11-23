"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";

import {
  type LoginFormSchemaType,
  signupFormSchema,
  type SignupFormSchemaType,
} from "@/validators/signupSchema";
import FormBuilder from "@/components/shared/Forms/formBuilder";
import { Icons } from "@/components/shared/icons";

const Signup = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const LOGIN_FORM_DATA = [
    {
      label: "Email",
      name: "email",
      placeholder: "jon@snow.com",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter a password",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
  ];

  const SIGNUP_FORM_DATA = [
    {
      label: "Full Name",
      name: "name",
      placeholder: "Jon Snow",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "jon@snow.com",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter a password",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Enter password again",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
    {
      label: "I agree to the terms and conditions",
      name: "tnc",
      placeholder: "",
      type: "",
      value: "",
      variant: "Checkbox",
      required: true,
    },
  ];

  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });

  const handleSigninWithProvider = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/google`, {
        method: "GET",
      });
      console.log("Response:", response);

      if (!response.ok) {
        console.log(response);
        throw new Error("Login failed");
      }

      const result = await response.json();
      localStorage.setItem("authToken", result.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  const onRegisterSubmit = (data: SignupFormSchemaType) => {
    console.log(data);
  };
  const onLoginSubmit = (data: LoginFormSchemaType) => {
    console.log(data);
    //login(data);
  };

  return (
    <Form {...form}>
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
                <Image
                  src="/logo.png"
                  alt="MITHILA LEGACY"
                  width={1000}
                  height={1000}
                  className="w-28"
                />
                <CardTitle className="h3">Welcome Back</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form
                  onSubmit={form.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormBuilder formData={LOGIN_FORM_DATA} form={form} />
                  <Button
                    className="w-full"
                    variant="secondary"
                    size="lg"
                    type="submit"
                  >
                    Log In
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleSigninWithProvider()}
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
                <form
                  onSubmit={form.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <FormBuilder formData={SIGNUP_FORM_DATA} form={form} />
                  <Button
                    className="w-full"
                    variant="secondary"
                    size="lg"
                    type="submit"
                  >
                    Create account
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                {/* Google sign */}
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
    </Form>
  );
};

export default Signup;
