import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default AuthLayout;
